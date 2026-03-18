import fs from "node:fs/promises";
import path from "node:path";
import { supabase } from "./config.js";
import { canonicalStringify } from "./canonical.js";
import { sha256Hex, signPayload } from "./signer.js";

async function main() {
  const [, , memoryId, privateKeyPath, outDir = "exports"] = process.argv;

  if (!memoryId || !privateKeyPath) {
    console.error(
      "Usage: npm run export:bundle -- <memory-id> <private-key-path> [out-dir]"
    );
    process.exit(1);
  }

  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .eq("id", memoryId)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Memory not found");

  const memoryPayload = {
    id: data.id,
    project_id: data.project_id,
    memory_type: data.memory_type,
    title: data.title,
    summary: data.summary,
    content: data.content,
    tags: data.tags,
    status: data.status,
    confidence: data.confidence,
    importance: data.importance,
    source: data.source,
    source_ref: data.source_ref ?? null,
    evidence_url: data.evidence_url ?? null,
    evidence_hash: data.evidence_hash ?? null,
    trust_level: data.trust_level,
    authority_level: data.authority_level ?? "working",
    checksum: data.checksum ?? null,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  const canonicalMemory = canonicalStringify(memoryPayload);
  const memoryChecksum = sha256Hex(canonicalMemory);

  const unsignedPayload = {
    bundle_version: "0.4.0",
    exported_at: new Date().toISOString(),
    memory: memoryPayload,
    manifest: {
      memory_checksum: memoryChecksum,
      payload_checksum: "",
      signature_algorithm: "ed25519",
      public_key_hint: path.basename(privateKeyPath).replace("private", "public"),
    },
  };

  const canonicalUnsigned = canonicalStringify(unsignedPayload);
  const payloadChecksum = sha256Hex(canonicalUnsigned);

  const finalUnsignedPayload = {
    ...unsignedPayload,
    manifest: {
      ...unsignedPayload.manifest,
      payload_checksum: payloadChecksum,
    },
  };

  const canonicalFinalUnsigned = canonicalStringify(finalUnsignedPayload);
  const signatureValue = await signPayload({
    payload: canonicalFinalUnsigned,
    privateKeyPath,
  });

  const bundle = {
    ...finalUnsignedPayload,
    signature: {
      algorithm: "ed25519",
      value: signatureValue,
    },
  };

  await fs.mkdir(outDir, { recursive: true });
  const outputPath = path.join(outDir, `memory-${memoryId}.trust.json`);
  await fs.writeFile(outputPath, JSON.stringify(bundle, null, 2));

  console.log(
    JSON.stringify(
      {
        ok: true,
        output: outputPath,
        memory_id: memoryId,
        bundle_version: "0.4.0",
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
