# 🧠 AndyAI Operational Memory

> Semantic memory is not enough.  
> Operational Memory connects what happened, what is happening, what is trusted, and what should happen next.

![Trust](https://img.shields.io/badge/trust-signed%20artifacts-brightgreen)
![Replay](https://img.shields.io/badge/replay-ready-blue)
![Lifecycle](https://img.shields.io/badge/memory-lifecycle--aware-purple)
![Release](https://img.shields.io/badge/release-CI%20gated-black)

## What this repo is

AndyAI Operational Memory is a trust-aware memory system for AI workflows.

It combines:

- semantic retrieval
- lifecycle-aware memory records
- trust/evidence metadata
- promotion gates
- signed trust exports
- replay-ready release artifacts

## Core Formula

**Memory + State + Direction + Trust + Action**

## Why it exists

Modern AI systems often fail because context is fragmented, temporary, and hard to verify.

This repo defines a practical foundation for systems that need more than chat history:
they need durable continuity.

---

## Thesis

Most AI memory systems stop at retrieval.

Operational Memory starts where retrieval stops.

It adds:
- lifecycle
- promotion
- evidence
- signatures
- replay
- release discipline

Because memory should not only be searchable.

It should be usable, trusted, and portable.

---

## Core Idea

Semantic memory is not enough.

Modern AI systems fail not because models are weak,
but because context is fragmented, temporary, and unreliable.

This repo defines a new standard:

👉 **Operational Memory**

---

## Definition

Operational Memory is a structured, persistent, and verifiable
knowledge layer that connects:

- Past (what happened)
- Present (what is happening)
- Direction (where things are going)
- Trust (what is verified)
- Action (what should be done)

---

## Positioning

This is not:

- a chatbot
- a note-taking app
- a vector database demo

This is:

- a knowledge substrate
- a continuity engine
- a trust-aware memory layer
- a foundation for agent systems

---

## Public Positioning

**Semantic memory helps AI retrieve the past.  
Operational memory helps AI work with continuity.**

A stronger version of the same idea:

**AI does not become reliable when it remembers more.  
It becomes reliable when memory is structured, trusted, and operational.**

---

## Architecture

See:
- `ARCHITECTURE.md`
- `MEMORY_LIFECYCLE.md`
- `RANKING_MODEL.md`
- `GRAPH_MODEL.md`
- `TRUST_MODEL.md`

### Core Layers

#### 1. Memory Layer
Stores structured memories with semantic retrieval support.

#### 2. State Layer
Connects current operational context and active workflow state.

#### 3. Direction Layer
Represents goals, plans, and trajectory.

#### 4. Trust Layer
Adds evidence, authority, promotion flow, signatures, and verification.

#### 5. Execution Layer
Supports integration with agents, tooling, automation, and release workflows.

---

## Memory Model

Operational Memory requires more than similarity search.

It requires records that can evolve through time.

### Minimal record concepts

- memory type
- status
- trust level
- authority level
- evidence
- related records
- replacement/supersession
- checksum/signature compatibility

### Canonical types

- decision
- case
- pattern
- preference
- plan
- reference

### Canonical lifecycle

- draft
- active
- verified
- superseded
- deprecated
- archived

---

## Trust Model

Knowledge is not truth without evidence.

The trust layer adds:

- evidence links
- evidence hashes
- authority levels
- promotion gates
- signed exports
- verification flow
- replay-ready manifests

This moves memory from “helpful retrieval” toward “portable trust artifact.”

---

## Implemented Foundations

This repository includes foundations for:

- Supabase + pgvector memory storage
- semantic retrieval
- ranking beyond cosine similarity
- duplicate blocking
- staged promotion flow
- audit logging
- signed trust bundles
- trust bundle verification
- replay manifest export
- CI trust gates
- release packaging

---

## Project Structure

```text
andyai-operational-memory/
├── README.md
├── ARCHITECTURE.md
├── MEMORY_SCHEMA.json
├── MEMORY_LIFECYCLE.md
├── RANKING_MODEL.md
├── GRAPH_MODEL.md
├── TRUST_MODEL.md
├── package.json
├── tsconfig.json
├── .env.example
├── sql/
├── src/
├── schemas/
├── scripts/
├── docs/
├── examples/
├── trust/
├── release/
├── dist/
└── 00_CREATE_REMOTE_FIRST.md
```

---

## Quick Start

```bash
npm install
cp .env.example .env
```

Fill in your environment values in `.env`.

Then run SQL files in your Supabase SQL editor in this order:

1. `sql/001_extensions.sql`
2. `sql/002_memories_table.sql`
3. `sql/003_match_memories_function.sql`
4. `sql/004_indexes.sql`
5. `sql/005_memory_audit_log.sql`
6. `sql/006_find_duplicates_function.sql`
7. `sql/007_promote_memory_function.sql`

Start the local service:

```bash
npm run dev
```

---

## Example Insert

```bash
npm run cli -- insert examples/insert-memory.json
```

## Example Search

```bash
npm run cli -- search "Festie Spotify integration status"
```

## Example Promote

```bash
npm run cli -- promote <memory-id> active andy "Reviewed and promoted for operational use"
```

---

## Trust Commands

Generate local signing keys:

```bash
mkdir -p .keys
npm run cli -- gen-keys .keys/memory-private.pem .keys/memory-public.pem
```

Export a signed trust bundle:

```bash
npm run export:bundle -- <memory-id> .keys/memory-private.pem exports
```

Verify a trust bundle:

```bash
npm run verify:bundle -- exports/memory-<id>.trust.json .keys/memory-public.pem
```

Export a replay manifest:

```bash
npm run replay:export -- <project-id> exports
```

---

## Trust Folder Layout

```text
trust/
├── bundles/
├── reports/
├── replay/
└── public-keys/
```

### Meaning

- `bundles/` → signed trust artifacts
- `reports/` → generated trust summaries
- `replay/` → replay-ready exports
- `public-keys/` → distributable verification keys

Rule:

- portable, reviewable artifacts belong in `trust/`
- private keys must never be committed

---

## Release Discipline

This repo includes CI trust gates for:

- TypeScript integrity
- trust bundle validation
- replay manifest validation
- release manifest generation
- trust report generation

### Local trust run

```bash
npm run trust:all
```

---

## One-Command Release Packaging

This repo supports one-command release packaging:

```bash
npm run release:all
```

### Outputs

- `dist/` → final ZIP packages
- `release/` → build log, release notes, release summary
- `trust/` → bundles, reports, replay manifests, public keys

---

## Release Principle

A release must be verifiable, not just present.

No green CI = no trust claim.

This means:

- no broken bundle structure
- no drifting replay manifests
- no release package without validation
- no trust language without trust artifacts

---

## Why this matters

Most AI systems can answer questions.

Far fewer can preserve:

- decision history
- operational continuity
- verified memory state
- portable evidence
- replayable context

That is the gap this project is meant to explore.

---

## Intended Audience

This project is for:

- AI engineers
- agent builders
- infra/tooling teams
- trust/safety-minded developers
- advanced personal knowledge system builders
- teams building long-running AI workflows

---

## Current Status

**v1.0.0 — Trust-Aware Operational Memory Foundation**

This is a public foundation release.

It establishes the canonical structure, trust model, and release discipline for a governed memory system that goes beyond basic semantic retrieval.

---

## Canonical Insight

**Semantic Memory → finds**  
**Operational Memory → carries**  
**Trust Memory → proves**

---

## Final Insight

AI does not only need more intelligence.

It needs better memory infrastructure.
