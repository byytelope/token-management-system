import { createServerClient } from "@supabase/ssr";
import { Database } from "./supabaseTypes";

export const supabase = createServerClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
  {
    cookies: {},
  },
);
