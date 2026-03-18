import fs from "node:fs/promises";
import { insertMemory, searchMemories } from "./memory-service.js";
import { InsertMemorySchema } from "./types.js";

async function main() {
  const [, , command, arg] = process.argv;

  if (command === "insert" && arg) {
    const raw = await fs.readFile(arg, "utf8");
    const json = JSON.parse(raw);
    const input = InsertMemorySchema.parse(json);
    const result = await insertMemory(input);
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (command === "search" && arg) {
    const result = await searchMemories({ query: arg, limit: 8 });
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(`Usage:
  npm run cli -- insert examples/insert-memory.json
  npm run cli -- search "spotify integration blocker"
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
