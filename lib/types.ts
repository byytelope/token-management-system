import type { Database } from "./supabase/types";

export type Service = Omit<
  Database["public"]["Tables"]["services"]["Row"],
  "name"
> & {
  name: { [lang: string]: string };
};
export type QueueItem = Database["public"]["Tables"]["queue_items"]["Row"];
export type Counter = Omit<
  Database["public"]["Tables"]["counters"]["Row"],
  "queue_history"
> & {
  queue_history: { queue_number: string; service_name: string }[];
};
