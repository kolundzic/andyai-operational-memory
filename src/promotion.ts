import { supabase } from "./config.js";

export async function promoteMemory(args: {
  memory_id: string;
  next_status: "active" | "verified" | "deprecated" | "superseded" | "archived";
  actor?: string;
  note?: string;
}) {
  const { data, error } = await supabase.rpc("promote_memory", {
    target_memory_id: args.memory_id,
    next_status: args.next_status,
    actor_name: args.actor ?? "system",
    promotion_note: args.note ?? null,
  });

  if (error) throw error;
  return data;
}
