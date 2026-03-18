# 🧠 AndyAI Operational Memory

> Semantic memory is not enough.  
> Operational Memory connects what happened, what is happening, what is trusted, and what should happen next.

![Trust](https://img.shields.io/badge/trust-signed%20artifacts-brightgreen)
![Replay](https://img.shields.io/badge/replay-ready-blue)
![Lifecycle](https://img.shields.io/badge/memory-lifecycle--aware-purple)
![Release](https://img.shields.io/badge/release-CI%20gated-black)

## What this repo is

AndyAI Operational Memory is a trust-aware memory layer for AI systems and agent workflows.

It is built to carry:
- durable continuity
- lifecycle-aware records
- trust and evidence metadata
- replayable artifacts
- release discipline

## Core Formula

**Memory + State + Direction + Trust + Action**

## Thesis

**Semantic memory helps AI retrieve the past.**  
**Operational memory helps AI work with continuity.**

This repo pushes beyond retrieval by adding:
- lifecycle
- promotion
- evidence
- signatures
- replay
- release discipline

## Quick Start

```bash
npm install
cp .env.example .env
npm run check
npm run trust:all
npm run release:all
```

## Why it exists

Modern AI systems often fail because context is fragmented, temporary, and hard to verify.

This repo defines a practical foundation for systems that need more than chat history:
they need durable, trusted, operational continuity.

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

## Architecture

See:
- `ARCHITECTURE.md`
- `MEMORY_LIFECYCLE.md`
- `RANKING_MODEL.md`
- `GRAPH_MODEL.md`
- `TRUST_MODEL.md`
- `docs/interoperability.md`

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

### One-command release packaging

```bash
npm run release:all
```

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

**v1.0.2 — README Hero Polish**

This release tightens the first-screen presentation while preserving the trust-aware architecture, lifecycle model, and release discipline established in v1.0.0 and v1.0.1.

---

## Canonical Insight

**Semantic Memory → finds**  
**Operational Memory → carries**  
**Trust Memory → proves**

---

## Final Insight

AI does not only need more intelligence.

It needs better memory infrastructure.
