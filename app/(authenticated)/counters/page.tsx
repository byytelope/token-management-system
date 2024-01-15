import { getAllCounters, getAllServices } from "@/lib/actions";
import CounterArea from "./counter-area";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "TMS | Counters",
  description: "Token management solution by yours truly",
};

export default async function CountersPage() {
  const services = await getAllServices();
  const counters = await getAllCounters();

  return (
    <>
      <CounterArea serverCounters={counters} services={services} />
    </>
  );
}
