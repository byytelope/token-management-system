"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getCounterById, nextQueueNum, updateCounter } from "@/lib/actions";
import { useBrowserClient } from "@/lib/supabase/client";
import type { Counter } from "@/lib/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export default function CounterCard({
  servicesInfo,
}: { servicesInfo: { id: string; name: { [key: string]: string } }[] }) {
  const [skipUpdate, setSkipUpdate] = useState(true);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [counter, setCounter] = useState<Counter>();
  const supabase = useBrowserClient();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      if (searchParams.get("id") != null) {
        const c = await getCounterById(searchParams.get("id")!);
        setCounter(c);
        setSelectedServiceIds(c != null ? c.category_ids : []);
      } else {
        setCounter(undefined);
        setSelectedServiceIds([]);
      }
      setSkipUpdate(true);
    };

    fetchData();
  }, [searchParams]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Prevent recursive refresh
  useEffect(() => {
    const fetchData = setTimeout(
      async () => {
        if (!skipUpdate) {
          console.log(selectedServiceIds);
          await updateCounter(counter!.id, {
            category_ids: selectedServiceIds,
          });
        } else {
          setSkipUpdate(false);
        }
      },
      skipUpdate ? 0 : 1000,
    );

    return () => clearTimeout(fetchData);
  }, [selectedServiceIds]);

  useEffect(() => {
    const channel = supabase
      .channel("counter-update-channel")
      .on<Counter>(
        "postgres_changes",
        { event: "*", schema: "public", table: "counters" },
        (payload) => {
          console.log("Change received!", payload);
          const newCounter = payload.new as Counter;
          if (
            newCounter.counter_number != null &&
            counter != null &&
            newCounter.id === counter.id
          ) {
            setCounter(newCounter);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, counter]);

  return (
    <>
      <Card className="flex flex-col justify-between w-full">
        <CardHeader>
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Counter Control</CardTitle>
              <CardDescription>
                Counter {counter != null ? counter.counter_number : "0"}
              </CardDescription>
              <Badge
                variant={
                  counter != null
                    ? counter.is_open
                      ? "outline"
                      : "destructive"
                    : "destructive"
                }
                className="w-fit pointer-events-none"
              >
                {counter != null
                  ? counter.is_open
                    ? "Open"
                    : "Closed"
                  : "Select a counter"}
              </Badge>
            </div>
            <div>
              <Button
                variant="destructive"
                className={counter?.is_open ? "" : "hidden"}
                disabled={counter == null}
                onClick={async () => {
                  await updateCounter(counter!.id, { is_open: false });
                }}
              >
                Close Counter
              </Button>
              <Button
                variant="outline"
                className={counter?.is_open ? "hidden" : ""}
                disabled={counter == null}
                onClick={async () => {
                  await updateCounter(counter!.id, { is_open: true });
                }}
              >
                Open Counter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 items-center">
          <div
            className={`flex flex-col items-center transition-colors ${
              counter?.is_open ? "text-foreground" : "text-muted-foreground/50"
            }`}
          >
            <p className="text-4xl font-bold tabular-nums">
              {counter?.queue_history[0]?.queue_number ?? "#0000"}
            </p>
            <p className="text-xl font-light">
              {counter?.queue_history[0]?.service_name ?? "-"}
            </p>
          </div>
          <Button
            disabled={!counter?.is_open || selectedServiceIds.length === 0}
            variant="outline"
            onClick={async () => {
              await nextQueueNum(counter!, selectedServiceIds);
            }}
          >
            Next Number
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 mt-4 items-start">
          <p className="text-sm text-muted-foreground">
            Select accepted services
          </p>
          <Separator />
          <ToggleGroup
            disabled={counter == null}
            type="multiple"
            className="flex flex-wrap justify-start"
            value={selectedServiceIds}
            onValueChange={(values) => setSelectedServiceIds(values)}
          >
            {servicesInfo.map((service) => (
              <ToggleGroupItem key={service.id!} value={service.id!}>
                {service.name["en-US"]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardFooter>
      </Card>
    </>
  );
}
