import { supabase } from "./config.js";

export async function findDuplicates(args: {
  embedding: number[];
  project_id: string;
  threshold?: number;
  limit?: number;
}) {
  const { data, error } = await supabase.rpc("find_duplicate_memories", {
    query_embedding: args.embedding,
    query_project_id: args.project_id,
    similarity_threshold: args.threshold ?? 0.95,
    query_limit: args.limit ?? 5,
  });

  if (error) throw error;
  return data ?? [];
}
