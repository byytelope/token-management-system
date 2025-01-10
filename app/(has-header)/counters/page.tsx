import type { Metadata } from "next";

import { getAllCounters, getAllServices } from "@/lib/actions";
import CounterArea from "./counter-area";

export const metadata: Metadata = {
  title: "TMS | Counters",
  description: "Token management solution",
};

export default async function CountersPage() {
  const servicesInfo = await getAllServices(["id", "name"]);
  const counterInfo = await getAllCounters(["id", "counter_number"]);

  return (
    <>
      <CounterArea counterInfo={counterInfo} servicesInfo={servicesInfo} />
    </>
  );
}
