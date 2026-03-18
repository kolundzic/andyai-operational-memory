from andyai_operational_memory_client import OperationalMemoryClient


client = OperationalMemoryClient(base_url="http://localhost:8787")

print("HEALTH")
print(client.health())

print("SEARCH")
print(
    client.search(
        query="Festie Spotify integration status",
        project_id="festie",
        limit=5,
    )
)
