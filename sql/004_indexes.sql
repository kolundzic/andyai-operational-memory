create index if not exists idx_memories_project_id on public.memories(project_id);
create index if not exists idx_memories_memory_type on public.memories(memory_type);
create index if not exists idx_memories_status on public.memories(status);
create index if not exists idx_memories_created_at on public.memories(created_at desc);

-- Add later around 2k+ records:
-- create index if not exists idx_memories_embedding_hnsw
-- on public.memories
-- using hnsw (embedding vector_cosine_ops);
