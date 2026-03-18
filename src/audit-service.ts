import { supabase } from "./config.js";

export async function writeAuditLog(args: {
  memory_id: string;
  event_type:
    | "created"
    | "duplicate_blocked"
    | "updated"
    | "promoted"
    | "verified"
    | "deprecated"
    | "superseded"
    | "archived"
    | "search_hit";
  actor?: string;
  note?: string;
  payload?: Record<string, unknown>;
}) {
  const { error } = await supabase.from("memory_audit_log").insert({
    memory_id: args.memory_id,
    event_type: args.event_type,
    actor: args.actor ?? "system",
    note: args.note ?? null,
    payload: args.payload ?? {},
  });

  if (error) throw error;
}
