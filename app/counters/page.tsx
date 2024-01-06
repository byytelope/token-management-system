"use client";

import { Counter, Service } from "@/lib/types";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/supabaseTypes";
import { Button } from "@/components/ui/button";
import { addCounter, getAllCounters, getAllServices } from "@/lib/actions";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import CounterSelect from "@/components/custom/counter-select";
import CounterCard from "@/components/custom/counter-card";
import { createQueryString } from "@/lib/utils";
import QueueInfo from "@/components/custom/queue-info";

export default function CounterArea() {
  const [services, setServices] = useState<Service[]>([]);
  const [counters, setCounters] = useState<Counter[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
  );

  useEffect(() => {
    const fetchData = async () => {
      console.log("bruh");
      const c = await getAllCounters();
      const s = await getAllServices();
      setCounters(c ?? []);
      setServices(s ?? []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("counter-update-channel")
      .on<Counter>(
        "postgres_changes",
        { event: "*", schema: "public", table: "counters" },
        (payload) => {
          console.log("Change received!", payload);
          setCounters((oldCounters) => {
            const newCounter = payload.new as Counter;
            const updatedCounters = oldCounters.map((c) =>
              c.id === newCounter.id ? newCounter : c,
            );

            return updatedCounters;
          });

          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between mb-16">
        <h1 className="text-3xl font-bold tracking-tight">Counters</h1>
        {counters.length === 0 ? (
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
          <CounterSelect counters={counters} />
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <CounterCard
          counter={counters.find(
            (counter) => counter.id === searchParams.get("id"),
          )}
          services={services}
        />
        <QueueInfo />
      </div>
    </div>
  );
}
