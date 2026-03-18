create or replace function public.find_duplicate_memories (
  query_embedding vector(1024),
  query_project_id text,
  similarity_threshold double precision default 0.95,
  query_limit int default 5
)
returns table (
  id uuid,
  title text,
  project_id text,
  memory_type text,
  status text,
  semantic_similarity double precision
)
language sql
stable
as $$
  select
    m.id,
    m.title,
    m.project_id,
    m.memory_type,
    m.status,
    1 - (m.embedding <=> query_embedding) as semantic_similarity
  from public.memories m
  where m.project_id = query_project_id
    and m.status <> 'archived'
    and (1 - (m.embedding <=> query_embedding)) >= similarity_threshold
  order by m.embedding <=> query_embedding
  limit query_limit;
$$;
