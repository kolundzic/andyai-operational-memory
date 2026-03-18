import { supabase } from "./config.js";
import { embedText } from "./embedder.js";
import { rankMemory } from "./rank.js";
import type { InsertMemoryInput, MemoryRow, SearchInput } from "./types.js";

function composeMemoryText(input: InsertMemoryInput): string {
  return [
    input.project_id,
    input.memory_type,
    input.title,
    input.summary,
    input.content,
    input.tags.join(" "),
  ].join("\n");
}

export async function insertMemory(input: InsertMemoryInput) {
  const embedding = await embedText(composeMemoryText(input));

  const { data, error } = await supabase
    .from("memories")
    .insert({
      ...input,
      embedding,
    })
    .select("id, title, memory_type, project_id, status")
    .single();

  if (error) throw error;
  return data;
}

export async function searchMemories(input: SearchInput) {
  const embedding = await embedText(input.query);

  const { data, error } = await supabase.rpc("match_memories", {
    query_embedding: embedding,
    query_project_id: input.project_id ?? null,
    query_limit: input.limit,
  });

  if (error) throw error;

  const ranked = (data as MemoryRow[])
    .map((row) => ({
      ...row,
      final_rank: rankMemory(row, input.project_id),
    }))
    .sort((a, b) => b.final_rank - a.final_rank);

  return ranked;
}
