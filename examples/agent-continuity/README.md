# Agent Continuity End-to-End Example

This example shows a minimal operational-memory flow from capture to verified reuse.

## Scenario

A skill-driven agent is working on a Spotify integration task for project `festie`.
The system must:

1. Capture a new memory record as `draft`
2. Search operational memory for related context
3. Promote the record from `draft` to `active`
4. Promote the record from `active` to `verified`
5. Export a signed trust bundle
6. Export a replay manifest for project review

## Files

- `01-insert-memory.json` → initial memory record
- `02-search-query.json` → retrieval query
- `03-promote-active.json` → draft → active
- `04-promote-verified.json` → active → verified
- `05-example-trust-bundle.json` → reference signed bundle shape
- `06-example-replay-manifest.json` → reference replay artifact
- `run-example.sh` → canonical command sequence
- `skill-memory-handoff.json` → how a skill hands context into memory

## Canonical flow

```text
Skill execution
  -> memory capture (draft)
  -> semantic search
  -> promotion to active
  -> promotion to verified
  -> signed export
  -> replay manifest
```

## Why this matters

This is the missing bridge between:

- architecture docs
- trust model
- actual operator workflow

Operational Memory becomes much easier to understand when the user can follow one concrete path from raw record to trusted artifact.
