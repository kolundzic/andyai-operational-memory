import { z } from "zod";

export const MemoryTypeSchema = z.enum([
  "decision",
  "case",
  "pattern",
  "preference",
  "plan",
  "reference",
]);

export const MemoryStatusSchema = z.enum([
  "draft",
  "active",
  "deprecated",
  "superseded",
  "archived",
  "blocked",
  "verified",
]);

export const TrustLevelSchema = z.enum([
  "unverified",
  "inferred",
  "validated",
  "production-safe",
]);

export const InsertMemorySchema = z.object({
  project_id: z.string().min(1),
  memory_type: MemoryTypeSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  status: MemoryStatusSchema.default("active"),
  confidence: z.number().min(0).max(1).default(0.5),
  importance: z.number().int().min(0).max(10).default(5),
  source: z.string().default("manual"),
  evidence_url: z.string().url().optional(),
  trust_level: TrustLevelSchema.default("unverified"),
  related_to: z.array(z.string()).default([]),
  superseded_by: z.string().optional(),
  valid_from: z.string().datetime().optional(),
  valid_until: z.string().datetime().optional(),
});

export const SearchSchema = z.object({
  query: z.string().min(1),
  project_id: z.string().optional(),
  limit: z.number().int().min(1).max(20).default(8),
});

export type InsertMemoryInput = z.infer<typeof InsertMemorySchema>;
export type SearchInput = z.infer<typeof SearchSchema>;

export type MemoryRow = {
  id: string;
  project_id: string;
  memory_type: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  status: string;
  confidence: number;
  importance: number;
  source: string;
  evidence_url?: string | null;
  trust_level: string;
  created_at: string;
  updated_at: string;
  semantic_similarity: number;
};
