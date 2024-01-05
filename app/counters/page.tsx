import CounterArea from "@/components/custom/counter-area";
import { getAllCounters, getAllServices } from "@/lib/actions";
import { unstable_noStore as noStore } from "next/cache";

export default async function Counters() {
  noStore();
  const counters = await getAllCounters();
  const services = await getAllServices();

  return (
    <>
      <CounterArea counters={counters ?? []} services={services ?? []} />
    </>
  );
}
