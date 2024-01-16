import { getAllCounters, getAllServices } from "@/lib/actions";
import CounterArea from "./counter-area";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMS | Counters",
  description: "Token management solution by yours truly",
};

export default async function CountersPage() {
  const servicesInfo = await getAllServices(["id", "name"]);
  const counterInfo = await getAllCounters(["id", "counterNumber"]);

  return (
    <>
      <CounterArea counterInfo={counterInfo} servicesInfo={servicesInfo} />
    </>
  );
}
