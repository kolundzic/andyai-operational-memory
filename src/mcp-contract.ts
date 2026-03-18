export type MCPMemoryResult = {
  id: string;
  title: string;
  project_id: string;
  memory_type: string;
  summary: string;
  status: string;
  trust_level: string;
  final_rank: number;
};

export type MCPSearchResponse = {
  ok: true;
  query: string;
  count: number;
  results: MCPMemoryResult[];
};

export function toMCPResponse(query: string, rows: any[]): MCPSearchResponse {
  return {
    ok: true,
    query,
    count: rows.length,
    results: rows.map((row) => ({
      id: row.id,
      title: row.title,
      project_id: row.project_id,
      memory_type: row.memory_type,
      summary: row.summary,
      status: row.status,
      trust_level: row.trust_level,
      final_rank: row.final_rank,
    })),
  };
}
