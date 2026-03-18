create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  project_id text not null,
  memory_type text not null check (
    memory_type in ('decision', 'case', 'pattern', 'preference', 'plan', 'reference')
  ),
  title text not null,
  summary text not null,
  content text not null,
  tags text[] not null default '{}',
  status text not null default 'active' check (
    status in ('draft', 'active', 'deprecated', 'superseded', 'archived', 'blocked', 'verified')
  ),
  confidence double precision not null default 0.5 check (confidence >= 0 and confidence <= 1),
  importance integer not null default 5 check (importance >= 0 and importance <= 10),
  source text not null default 'manual',
  evidence_url text,
  trust_level text not null default 'unverified' check (
    trust_level in ('unverified', 'inferred', 'validated', 'production-safe')
  ),
  related_to uuid[] not null default '{}',
  superseded_by uuid,
  valid_from timestamptz,
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  embedding vector(1024) not null
);
