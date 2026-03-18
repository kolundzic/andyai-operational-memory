# HTTP API

## Goal

Expose AndyAI Operational Memory through a clean HTTP interface so that any agent, workflow, or external service can read and write memory without depending on the internal CLI.

## Design Principles

- stable JSON contracts
- explicit trust-aware responses
- compact payloads for agent calls
- clear distinction between working and verified memory
- transport-neutral usage from Python, TypeScript, shell, or future Director UI

## Core Endpoints

### `GET /health`
Returns service health metadata.

### `POST /memory/insert`
Insert a new memory record.

### `POST /memory/search`
Search memory and return ranked results.

### `POST /memory/search-mcp`
Search memory and return a compact agent-friendly response.

### `POST /memory/promote`
Promote a memory through the lifecycle.

### `GET /api/info`
Return endpoint inventory and version metadata.

## Suggested Usage Flow

1. create a draft memory
2. search for context before inserting more
3. promote to `active`
4. verify when evidence is present
5. export trust bundle if needed

## Example

```bash
curl -s http://localhost:8787/api/info
```

```bash
curl -s http://localhost:8787/health
```

```bash
curl -s -X POST http://localhost:8787/memory/search \
  -H "Content-Type: application/json" \
  -d '{"query":"spotify integration blocker","project_id":"festie","limit":5}'
```

## Why this matters

The HTTP API is the neutral bridge layer.

- CLI is good for operators.
- MCP is good for tool-calling agents.
- HTTP is good for everything else.

This is what makes Operational Memory usable across ecosystems.
