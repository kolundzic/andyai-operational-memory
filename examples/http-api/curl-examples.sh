#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:8787}"

echo "== health =="
curl -s "$BASE_URL/health" | jq . || curl -s "$BASE_URL/health"

echo

echo "== api info =="
curl -s "$BASE_URL/api/info" | jq . || curl -s "$BASE_URL/api/info"

echo

echo "== search =="
curl -s -X POST "$BASE_URL/memory/search" \
  -H "Content-Type: application/json" \
  -d @examples/http-api/search.request.json | jq . || \
  curl -s -X POST "$BASE_URL/memory/search" -H "Content-Type: application/json" -d @examples/http-api/search.request.json
