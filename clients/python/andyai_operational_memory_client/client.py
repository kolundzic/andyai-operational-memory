from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, Optional

import requests


@dataclass
class OperationalMemoryClient:
    base_url: str
    timeout_seconds: int = 30

    def _url(self, path: str) -> str:
        return f"{self.base_url.rstrip('/')}{path}"

    def health(self) -> Dict[str, Any]:
        response = requests.get(self._url("/health"), timeout=self.timeout_seconds)
        response.raise_for_status()
        return response.json()

    def insert(self, memory: Dict[str, Any]) -> Dict[str, Any]:
        response = requests.post(
            self._url("/memory/insert"),
            json=memory,
            timeout=self.timeout_seconds,
        )
        response.raise_for_status()
        return response.json()

    def search(
        self,
        query: str,
        project_id: Optional[str] = None,
        limit: int = 8,
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {"query": query, "limit": limit}
        if project_id:
            payload["project_id"] = project_id

        response = requests.post(
            self._url("/memory/search"),
            json=payload,
            timeout=self.timeout_seconds,
        )
        response.raise_for_status()
        return response.json()

    def search_mcp(
        self,
        query: str,
        project_id: Optional[str] = None,
        limit: int = 8,
    ) -> Dict[str, Any]:
        payload: Dict[str, Any] = {"query": query, "limit": limit}
        if project_id:
            payload["project_id"] = project_id

        response = requests.post(
            self._url("/memory/search-mcp"),
            json=payload,
            timeout=self.timeout_seconds,
        )
        response.raise_for_status()
        return response.json()

    def promote(
        self,
        memory_id: str,
        next_status: str,
        actor: str = "python-client",
        note: str = "",
    ) -> Dict[str, Any]:
        payload = {
            "memory_id": memory_id,
            "next_status": next_status,
            "actor": actor,
            "note": note,
        }
        response = requests.post(
            self._url("/memory/promote"),
            json=payload,
            timeout=self.timeout_seconds,
        )
        response.raise_for_status()
        return response.json()
