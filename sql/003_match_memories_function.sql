create or replace function public.match_memories (
  query_embedding vector(1024),
  query_project_id text default null,
  query_limit int default 8
)
returns table (
  id uuid,
  project_id text,
  memory_type text,
  title text,
  summary text,
  content text,
  tags text[],
  status text,
  confidence double precision,
  importance integer,
  source text,
  evidence_url text,
  trust_level text,
  created_at timestamptz,
  updated_at timestamptz,
  semantic_similarity double precision
)
language sql
stable
as $$
  select
    m.id,
    m.project_id,
    m.memory_type,
    m.title,
    m.summary,
    m.content,
    m.tags,
    m.status,
    m.confidence,
    m.importance,
    m.source,
    m.evidence_url,
    m.trust_level,
    m.created_at,
    m.updated_at,
    1 - (m.embedding <=> query_embedding) as semantic_similarity
  from public.memories m
  where (query_project_id is null or m.project_id = query_project_id)
    and m.status <> 'archived'
  order by m.embedding <=> query_embedding
  limit query_limit;
$$;
