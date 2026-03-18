import crypto from "node:crypto";
import type { InsertMemoryInput } from "./types.js";

export function hashEvidence(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function computeMemoryChecksum(memory: InsertMemoryInput): string {
  const canonical = JSON.stringify({
    project_id: memory.project_id,
    memory_type: memory.memory_type,
    title: memory.title,
    summary: memory.summary,
    content: memory.content,
    tags: memory.tags,
    source: memory.source,
    source_ref: memory.source_ref ?? null,
    evidence_url: memory.evidence_url ?? null,
    trust_level: memory.trust_level,
    authority_level: memory.authority_level,
  });

  return crypto.createHash("sha256").update(canonical).digest("hex");
}
