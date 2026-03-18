from andyai_operational_memory_client import OperationalMemoryClient


client = OperationalMemoryClient(base_url="http://localhost:8787")

memory = {
    "project_id": "festie",
    "memory_type": "decision",
    "title": "Use Spotify Web API from Python workflow",
    "summary": "Python agent stores a decision in operational memory.",
    "content": "This record demonstrates how a Python-based agent can save a decision and then promote it through the lifecycle.",
    "tags": ["python", "spotify", "decision", "example"],
    "status": "draft",
    "confidence": 0.8,
    "importance": 7,
    "source": "python-example",
    "trust_level": "inferred",
    "authority_level": "working"
}

insert_result = client.insert(memory)
print("INSERT RESULT")
print(insert_result)

memory_id = insert_result.get("result", {}).get("id") or insert_result.get("id")

if memory_id:
    print("PROMOTE TO ACTIVE")
    print(client.promote(memory_id, "active", actor="python-example", note="Promoted from Python starter client"))
