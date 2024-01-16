"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { addCounter, rpc } from "@/lib/actions";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import CounterSelect from "@/components/custom/counter-select";
import CounterCard from "@/components/custom/counter-card";
import { createQueryString } from "@/lib/utils";
import QueueInfo from "@/components/custom/queue-info";
import { toast } from "sonner";

export default function CounterArea({
  servicesInfo,
  counterInfo,
}: {
  servicesInfo: { id: string; name: { [key: string]: string } }[];
  counterInfo: { id: string; counterNumber: number }[];
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
                    counter!.id,
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
