# 🧠 AndyAI Operational Memory

> Trust-aware operational memory layer for AI systems.

## ⚡ What is this?

AndyAI Operational Memory is a structured memory layer for AI systems that require:

- continuity across interactions
- verifiable history
- replayable execution context
- promotion from raw data → trusted knowledge

## 🧠 Core Idea

LLMs forget.

This system does not.

## 🔩 Capabilities (v0.2)

- structured memory records
- lifecycle stages (raw → curated → trusted)
- semantic retrieval foundation
- deterministic packaging mindset
- Supabase + pgvector memory engine skeleton
- REST API and CLI entry points

## 🏗 Architecture Overview

See: `ARCHITECTURE.md`

## 🗺 Roadmap

See: `ROADMAP.md`

## 🚀 Philosophy

Memory is decision infrastructure.

## 🤜💥 Status

v0.2 — memory engine pack

## Quick Start

```bash
npm install
cp .env.example .env
```

Then run SQL files in your Supabase SQL editor in this order:

1. `sql/001_extensions.sql`
2. `sql/002_memories_table.sql`
3. `sql/003_match_memories_function.sql`
4. `sql/004_indexes.sql`

Start the local service:

```bash
npm run dev
```
