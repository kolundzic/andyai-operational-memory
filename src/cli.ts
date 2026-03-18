import fs from "node:fs/promises";
import { insertMemory, searchMemories } from "./memory-service.js";
import { promoteMemory } from "./promotion.js";
import { InsertMemorySchema } from "./types.js";
import { generateEd25519Keypair } from "./signer.js";

async function main() {
  const [, , command, ...args] = process.argv;

  if (command === "insert" && args[0]) {
    const raw = await fs.readFile(args[0], "utf8");
    const json = JSON.parse(raw);
    const input = InsertMemorySchema.parse(json);
    const result = await insertMemory(input);
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (command === "search" && args[0]) {
    const result = await searchMemories({ query: args[0], limit: 8 });
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (command === "promote" && args[0] && args[1]) {
    const result = await promoteMemory({
      memory_id: args[0],
      next_status: args[1] as
        | "active"
        | "verified"
        | "deprecated"
        | "superseded"
        | "archived",
      actor: args[2] ?? "system",
      note: args[3] ?? "",
    });
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (command === "gen-keys" && args[0] && args[1]) {
    const result = await generateEd25519Keypair({
      privateKeyPath: args[0],
      publicKeyPath: args[1],
    });
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(`Usage:
  npm run cli -- insert examples/insert-memory.json
  npm run cli -- search "spotify integration blocker"
  npm run cli -- promote <memory-id> <active|verified|deprecated|superseded|archived> [actor] [note]
  npm run cli -- gen-keys .keys/memory-private.pem .keys/memory-public.pem
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
