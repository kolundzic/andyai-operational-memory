# AndyAI Operational Memory Python Client

This starter client reduces the gap between Python-based agent systems and the TypeScript operational memory service.

## Why this exists

`andyai-skill-engine` is Python-first.
`andyai-operational-memory` is TypeScript-first.

This client provides a simple bridge layer so Python workflows can:

- insert memory records
- search operational memory
- promote records through lifecycle states
- prepare for trust/export workflows

## Scope

This is a starter client, not a full SDK.

It is intentionally small and focused on the core operational paths.

## Install

```bash
cd clients/python
pip install -e .
```

## Quick example

```python
from andyai_operational_memory_client import OperationalMemoryClient

client = OperationalMemoryClient(base_url="http://localhost:8787")

result = client.search("Festie Spotify integration status", project_id="festie", limit=5)
print(result)
```

## Core methods

- `health()`
- `insert(memory_dict)`
- `search(query, project_id=None, limit=8)`
- `search_mcp(query, project_id=None, limit=8)`
- `promote(memory_id, next_status, actor="python-client", note="")`

## Relationship to the repo

This client is a bridge layer.

It does not replace:
- trust scripts
- release discipline
- signed bundle workflows

It simply makes the memory substrate easier to use from Python agent code.
