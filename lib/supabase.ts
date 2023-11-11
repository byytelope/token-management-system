import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabaseTypes";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
);
