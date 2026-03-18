import crypto from "node:crypto";
import { config } from "./config.js";

function seededNumber(seed: string, index: number): number {
  const hash = crypto.createHash("sha256").update(`${seed}:${index}`).digest();
  const value = hash.readUInt32BE(0);
  return (value / 0xffffffff) * 2 - 1;
}

function normalize(vec: number[]): number[] {
  const mag = Math.sqrt(vec.reduce((sum, x) => sum + x * x, 0)) || 1;
  return vec.map((x) => x / mag);
}

export async function embedText(text: string): Promise<number[]> {
  const seed = text.trim().toLowerCase();
  const vec = Array.from({ length: config.embeddingDim }, (_, i) =>
    seededNumber(seed, i)
  );
  return normalize(vec);
}
