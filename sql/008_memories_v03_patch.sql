alter table public.memories
  add column if not exists source_ref text,
  add column if not exists authority_level text not null default 'working' check (
    authority_level in ('working', 'reviewed', 'approved', 'canonical')
  ),
  add column if not exists evidence_hash text,
  add column if not exists checksum text;
