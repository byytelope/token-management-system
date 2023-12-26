import CounterSelect from "@/components/custom/counter-select";
import CounterArea from "@/components/custom/counters";
import NewCounterButton from "@/components/custom/new-counter-button";
import { supabase } from "@/lib/supabase";
import { Counter } from "@/lib/types";

export const revalidate = 0;

export default async function Counters() {
  const { data: counters } = await supabase
    .from("counters")
    .select("*")
    .order("counterNumber")
    .returns<Counter[]>();

  return (
    <main className="flex flex-col flex-grow items-center w-full h-full p-6 pt-8">
      <div className="flex w-full justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Counters</h2>
        <div className="flex gap-2">
          <CounterSelect counters={counters ?? []} />
          <NewCounterButton />
        </div>
      </div>
      <div className="pt-24">
        <CounterArea counters={counters ?? []} />
      </div>
    </main>
  );
}
