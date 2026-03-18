import fs from "node:fs/promises";
import path from "node:path";
import { supabase } from "./config.js";
import { canonicalStringify } from "./canonical.js";
import { sha256Hex } from "./signer.js";

async function main() {
  const [, , projectId, outDir = "exports"] = process.argv;

  if (!projectId) {
    console.error("Usage: npm run replay:export -- <project-id> [out-dir]");
    process.exit(1);
  }

  const { data, error } = await supabase
    .from("memories")
    .select("id,title,status,trust_level,project_id,checksum,updated_at")
    .eq("project_id", projectId)
    .neq("status", "archived")
    .order("updated_at", { ascending: false });

  if (error) throw error;

  const items = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    status: row.status,
    trust_level: row.trust_level,
    checksum:
      row.checksum ??
      sha256Hex(
        canonicalStringify({
          id: row.id,
          title: row.title,
          status: row.status,
          trust_level: row.trust_level,
        })
      ),
  }));

  const manifest = {
    version: "0.4.0",
    exported_at: new Date().toISOString(),
    count: items.length,
    items,
  };

  await fs.mkdir(outDir, { recursive: true });
  const outputPath = path.join(outDir, `replay-${projectId}.json`);
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2));

  console.log(
    JSON.stringify(
      {
        ok: true,
        output: outputPath,
        count: items.length,
        project_id: projectId,
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
