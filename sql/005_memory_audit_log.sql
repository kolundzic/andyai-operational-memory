create table if not exists public.memory_audit_log (
  id uuid primary key default gen_random_uuid(),
  memory_id uuid not null references public.memories(id) on delete cascade,
  event_type text not null check (
    event_type in (
      'created',
      'duplicate_blocked',
      'updated',
      'promoted',
      'verified',
      'deprecated',
      'superseded',
      'archived',
      'search_hit'
    )
  ),
  actor text not null default 'system',
  note text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_memory_audit_log_memory_id
  on public.memory_audit_log(memory_id);

create index if not exists idx_memory_audit_log_event_type
  on public.memory_audit_log(event_type);

create index if not exists idx_memory_audit_log_created_at
  on public.memory_audit_log(created_at desc);
