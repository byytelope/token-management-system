"use client";

import { Counter, Service } from "@/lib/types";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/supabaseTypes";
import { Button } from "../ui/button";
import { addCounter } from "@/lib/actions";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CounterSelect from "./counter-select";
import CounterCard from "./counter-card";

export default function CounterArea({
  counters,
  services,
}: { counters: Counter[]; services: Service[] }) {
  const searchParams = useSearchParams();
  const counter = counters.find(
    (counter) => counter.id === searchParams.get("id"),
  );
  const router = useRouter();
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
  );

  useEffect(() => {
    const channel = supabase
      .channel("counter-update-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "counters" },
        (payload) => {
          console.log("Change received!", payload);
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
              await addCounter();
            }}
          >
            <PlusCircledIcon className="size-4" />
            Add Counter
          </Button>
        ) : (
          <CounterSelect counters={counters} />
        )}
      </div>
      <div className="flex gap-4">
        <CounterCard counter={counter} services={services} />
        <QueueInfoCard />
      </div>
    </div>
  );
}

function QueueInfoCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upcoming Numbers</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="gap-4"></CardFooter>
    </Card>
  );
}
