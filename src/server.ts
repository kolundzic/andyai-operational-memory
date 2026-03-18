import express from "express";
import { config } from "./config.js";
import { insertMemory, searchMemories } from "./memory-service.js";
import { promoteMemory } from "./promotion.js";
import { InsertMemorySchema, SearchSchema } from "./types.js";
import { toMCPResponse } from "./mcp-contract.js";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "andyai-operational-memory", version: "0.3.0" });
});

app.post("/memory/insert", async (req, res) => {
  try {
    const input = InsertMemorySchema.parse(req.body);
    const result = await insertMemory(input);
    res.json(result);
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/memory/search", async (req, res) => {
  try {
    const input = SearchSchema.parse(req.body);
    const result = await searchMemories(input);
    res.json({ ok: true, count: result.length, result });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/memory/search-mcp", async (req, res) => {
  try {
    const input = SearchSchema.parse(req.body);
    const result = await searchMemories(input);
    res.json(toMCPResponse(input.query, result));
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/memory/promote", async (req, res) => {
  try {
    const { memory_id, next_status, actor, note } = req.body;
    const result = await promoteMemory({ memory_id, next_status, actor, note });
    res.json({ ok: true, result });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(config.port, () => {
  console.log(`andyai-operational-memory listening on :${config.port}`);
});
