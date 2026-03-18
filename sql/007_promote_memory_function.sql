create or replace function public.promote_memory (
  target_memory_id uuid,
  next_status text,
  actor_name text default 'system',
  promotion_note text default null
)
returns public.memories
language plpgsql
as $$
declare
  current_row public.memories;
  allowed boolean := false;
begin
  select * into current_row
  from public.memories
  where id = target_memory_id;

  if not found then
    raise exception 'Memory not found';
  end if;

  if current_row.status = 'draft' and next_status = 'active' then
    allowed := true;
  elsif current_row.status = 'active' and next_status = 'verified' then
    allowed := true;
  elsif current_row.status = 'verified' and next_status = 'deprecated' then
    allowed := true;
  elsif current_row.status in ('draft', 'active', 'verified', 'deprecated', 'superseded')
        and next_status = 'archived' then
    allowed := true;
  elsif current_row.status = 'active' and next_status = 'superseded' then
    allowed := true;
  end if;

  if not allowed then
    raise exception 'Invalid promotion path: % -> %', current_row.status, next_status;
  end if;

  update public.memories
  set
    status = next_status,
    updated_at = now()
  where id = target_memory_id;

  insert into public.memory_audit_log (
    memory_id,
    event_type,
    actor,
    note,
    payload
  )
  values (
    target_memory_id,
    case
      when next_status = 'verified' then 'verified'
      else 'promoted'
    end,
    actor_name,
    promotion_note,
    jsonb_build_object(
      'from_status', current_row.status,
      'to_status', next_status
    )
  );

  return (
    select m
    from public.memories m
    where m.id = target_memory_id
  );
end;
$$;
