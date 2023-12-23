import Counters from "@/components/Counters";
import { Database } from "@/lib/supabaseTypes";
import { Counter } from "@/lib/types";
import { createServerClient } from "@supabase/ssr";

export const revalidate = 0;

export default async function Admin() {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
    {
      cookies: {},
    },
  );

  const { data: counters } = await supabase
    .from("counters")
    .select("*")
    .order("counterNumber")
    .returns<Counter[]>();

  return (
    <main className="flex flex-col flex-grow items-center w-full h-full py-24 px-32">
      <h1 className="text-3xl">Admin</h1>
      <div className="pt-24">
        <Counters counters={counters ?? []} />
      </div>
    </main>
  );
}
