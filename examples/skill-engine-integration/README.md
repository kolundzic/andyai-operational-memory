# Skill Engine Integration Example

This folder shows the canonical interoperability path between `andyai-skill-engine` and `andyai-operational-memory`.

## Flow

1. Skill Engine receives a validated skill request.
2. Skill Engine executes the skill.
3. A handoff JSON is emitted.
4. Operational Memory converts the handoff into a memory record.
5. The record enters lifecycle promotion.
6. Verified records can be exported as trust bundles or included in replay manifests.

## Files

- `skill-request.example.json` → example skill input
- `skill-memory-handoff.example.json` → canonical handoff object
- `memory-record-from-skill.example.json` → resulting memory record
- `run-integration-example.sh` → example shell flow

## Why this matters

This is the bridge from **execution** to **continuity**.
