#!/usr/bin/env bash
set -euo pipefail

# Canonical end-to-end example flow.
# Run from the repo root.

# 1) Insert a draft memory record
npm run cli -- insert examples/agent-continuity/01-insert-memory.json

# 2) Search related memory
curl -X POST http://localhost:8787/memory/search \
  -H "Content-Type: application/json" \
  -d @examples/agent-continuity/02-search-query.json

# 3) Promote the inserted record to active
curl -X POST http://localhost:8787/memory/promote \
  -H "Content-Type: application/json" \
  -d @examples/agent-continuity/03-promote-active.json

# 4) Promote the same record to verified
curl -X POST http://localhost:8787/memory/promote \
  -H "Content-Type: application/json" \
  -d @examples/agent-continuity/04-promote-verified.json

# 5) Export a signed trust bundle
npm run export:bundle -- REPLACE_WITH_MEMORY_UUID .keys/memory-private.pem exports

# 6) Verify the trust bundle
npm run verify:bundle -- exports/memory-REPLACE_WITH_MEMORY_UUID.trust.json .keys/memory-public.pem

# 7) Export a replay manifest
npm run replay:export -- festie exports
