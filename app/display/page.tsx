"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { getAllCounters } from "@/lib/actions";
import { useBrowserClient } from "@/lib/supabase";
import { Counter } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Display() {
  const router = useRouter();
  const [counters, setCounters] = useState<Counter[]>([]);
  const supabase = useBrowserClient();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCounters();
      setCounters(data ?? []);
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
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  return (
    <main className="flex flex-col py-12 px-8 lg:px-12 xl:px-16">
      <h1 className="font-bold text-3xl pb-24">Queue</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {counters.map((counter) => (
          <Card key={counter.id} className="p-8 flex flex-col gap-8">
            <div className="flex flex-col gap-4 justify-center items-center">
              <CardTitle className="text-3xl">
                Counter {counter.counterNumber}
              </CardTitle>
              <Badge
                variant={counter.isOpen ? "outline" : "destructive"}
                className="w-fit pointer-events-none text-md"
              >
                {counter.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>
            <div
              className={`flex flex-col gap-4 items-center transition-colors duration-300 ${
                counter.isOpen ? "text-foreground" : "text-muted-foreground/50"
              }`}
            >
              <p className="font-bold text-5xl tabular-nums">
                {counter.queueHistory[0]?.queueNumber ?? "#0000"}
              </p>
              <p className="text-xl">
                {counter.queueHistory[0]?.serviceName ?? "-"}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
