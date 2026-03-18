import type { MemoryRow } from "./types.js";

function daysSince(dateIso: string): number {
  const then = new Date(dateIso).getTime();
  const now = Date.now();
  return Math.max(0, (now - then) / (1000 * 60 * 60 * 24));
}

function recencyScore(updatedAt: string): number {
  const days = daysSince(updatedAt);
  if (days <= 3) return 1.0;
  if (days <= 14) return 0.8;
  if (days <= 30) return 0.6;
  if (days <= 90) return 0.35;
  return 0.15;
}

function statusWeight(status: string): number {
  switch (status) {
    case "verified":
    case "active":
      return 1.0;
    case "draft":
      return 0.6;
    case "blocked":
      return 0.5;
    case "deprecated":
      return 0.25;
    case "superseded":
      return 0.15;
    case "archived":
      return 0.0;
    default:
      return 0.4;
  }
}

function trustWeight(level: string): number {
  switch (level) {
    case "production-safe":
      return 1.0;
    case "validated":
      return 0.8;
    case "inferred":
      return 0.5;
    default:
      return 0.25;
  }
}

export function rankMemory(row: MemoryRow, queryProjectId?: string): number {
  const semantic = row.semantic_similarity;
  const recency = recencyScore(row.updated_at);
  const importance = row.importance / 10;
  const status = statusWeight(row.status);
  const trust = trustWeight(row.trust_level);
  const projectMatch = queryProjectId && row.project_id === queryProjectId ? 1 : 0.5;

  return (
    semantic * 0.45 +
    recency * 0.15 +
    importance * 0.15 +
    status * 0.1 +
    trust * 0.1 +
    projectMatch * 0.05
  );
}
