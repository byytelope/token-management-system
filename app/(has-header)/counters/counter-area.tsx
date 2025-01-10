"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import CounterCard from "@/components/custom/counter-card";
import CounterSelect from "@/components/custom/counter-select";
import QueueInfo from "@/components/custom/queue-info";
import { Button } from "@/components/ui/button";
import { addCounter, rpc } from "@/lib/actions";
import { createQueryString } from "@/lib/utils";

export default function CounterArea({
  servicesInfo,
  counterInfo,
}: {
  servicesInfo: { id: string; name: { [lang: string]: string } }[];
  counterInfo: { id: string; counter_number: number }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="w-full h-full mb-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-16">
        <h1 className="text-3xl font-bold tracking-tight">Counters</h1>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            className="gap-2"
            onClick={async () => {
              const res = await rpc("reset_tables_and_sequences");
              if (res.status === 200) {
                toast.success("Successfully reset database");
                router.push("/counters");
              } else {
                toast.error(res.message);
              }
            }}
          >
            <ExclamationTriangleIcon className="size-4" /> Reset all
          </Button>
          {counterInfo.length === 0 ? (
            <Button
              className="gap-2 w-40"
              variant="outline"
              onClick={async () => {
                const counter = await addCounter();
                router.push(
                  `${pathname}?${createQueryString(
                    "id",
                    counter!.id.toString(),
                    searchParams,
                  )}`,
                );
              }}
            >
              <PlusCircledIcon className="size-4" />
              Add Counter
            </Button>
          ) : (
            <CounterSelect counterInfo={counterInfo} />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CounterCard servicesInfo={servicesInfo} />
        <QueueInfo />
      </div>
    </div>
  );
}
