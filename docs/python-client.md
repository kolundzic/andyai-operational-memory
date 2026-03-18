# Python Client Starter

## Why this pack exists

The current AndyAI ecosystem has a practical split:

- `andyai-skill-engine` is Python-first
- `andyai-operational-memory` is TypeScript-first

This starter pack reduces friction between them.

## Goal

Make it easy for Python agent code to call operational memory over HTTP without waiting for a larger SDK effort.

## What is included

- minimal Python package
- lightweight HTTP client
- quickstart example
- insert + promote example

## Intended use

This is ideal for:

- Python agents
- skill-engine experiments
- notebooks
- integration prototypes
- bridge code before a fuller SDK exists

## Current contract

The client assumes these endpoints exist:

- `GET /health`
- `POST /memory/insert`
- `POST /memory/search`
- `POST /memory/search-mcp`
- `POST /memory/promote`

## Next logical step

After this starter pack, the strongest follow-up would be:

1. end-to-end skill-engine integration example
2. richer typed models
3. trust/export helpers in Python
4. optional publish to PyPI
