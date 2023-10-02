import CounterCard from "@/components/CounterCard";
import CreateCountersButton from "@/components/CreateCountersButton";
import { getAllCounters } from "@/lib/dbMethods";

export default async function Admin() {
  const counters = (await getAllCounters()).sort();

  return (
    <main className="flex flex-col flex-grow items-center w-full h-full py-24 px-32">
      <h1 className="text-3xl">Admin</h1>
      <div className="pt-24 flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          {counters.length === 0 ? <CreateCountersButton /> : null}
        </div>
        <div className="flex gap-8">
          {counters.map((counter) => (
            <CounterCard key={counter.id} counter={counter} />
          ))}
        </div>
      </div>
    </main>
  );
}
