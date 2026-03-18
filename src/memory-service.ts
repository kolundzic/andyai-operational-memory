import { supabase } from "./config.js";
import { embedText } from "./embedder.js";
import { rankMemory } from "./rank.js";
import { findDuplicates } from "./dedup.js";
import { writeAuditLog } from "./audit-service.js";
import { computeMemoryChecksum, hashEvidence } from "./trust.js";
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
  const duplicates = await findDuplicates({
    embedding,
    project_id: input.project_id,
    threshold: 0.95,
    limit: 3,
  });

  if (duplicates.length > 0) {
    return {
      ok: false,
      blocked: true,
      reason: "duplicate_detected",
      duplicates,
    };
  }

  const checksum = computeMemoryChecksum(input);
  const evidence_hash = input.evidence_url
    ? hashEvidence(input.evidence_url)
    : input.evidence_hash ?? null;

  const { data, error } = await supabase
    .from("memories")
    .insert({
      ...input,
      checksum,
      evidence_hash,
      embedding,
    })
    .select("id, title, memory_type, project_id, status, trust_level, authority_level")
    .single();

  if (error) throw error;

  await writeAuditLog({
    memory_id: data.id,
    event_type: "created",
    payload: {
      memory_type: data.memory_type,
      status: data.status,
      trust_level: data.trust_level,
      authority_level: data.authority_level,
    },
  });

  return {
    ok: true,
    blocked: false,
    result: data,
  };
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
