import { getAllCounters, getAllServices } from "@/lib/actions";
import CounterArea from "./counter-area";

export const revalidate = 0;

export default async function CountersPage() {
  const services = await getAllServices();
  const counters = await getAllCounters();

  return (
    <>
      <CounterArea serverCounters={counters} services={services} />
    </>
  );
}
