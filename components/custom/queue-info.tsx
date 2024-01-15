"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { QueueItem } from "@/lib/types";
import { getAllQueueItems } from "@/lib/actions";
import { useBrowserClient } from "@/lib/supabase";

export default function QueueInfo() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const supabase = useBrowserClient();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllQueueItems();
      setQueueItems(data ?? []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("queue-update-channel")
      .on<QueueItem>(
        "postgres_changes",
        { event: "*", schema: "public", table: "queueItems" },
        (payload) => {
          console.log("Change received!", payload);
          setQueueItems((oldQueueItems) => {
            if (payload.eventType === "INSERT") {
              return [...oldQueueItems, payload.new];
            } else if (payload.eventType === "DELETE") {
              const indexToDelete = oldQueueItems.findIndex(
                (q) => q.id === payload.old.id,
              );
              if (indexToDelete !== -1) {
                oldQueueItems.splice(indexToDelete, 1);
              }
            }

            return oldQueueItems;
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <Card className="w-full relative @container overflow-hidden">
      <CardHeader className="fixed w-full bg-background pb-0">
        <CardTitle>Queue</CardTitle>
        <CardDescription>Upcoming numbers</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="grid grid-cols-1 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 gap-2 md:gap-4 pt-24 max-h-[60dvh] overflow-scroll">
        {queueItems.map((item, i) => (
          <div
            key={item.id}
            className="flex rounded-lg border p-2 md:p-4 animate-in fade-in duration-500"
          >
            <div className="flex items-center">
              {i + 1}
              <Separator orientation="vertical" className="mx-2 md:mx-4" />
            </div>
            <div className="min-w-0 break-words">
              <p className="font-semibold text-sm">{item.queueNumber}</p>
              <p className="text-sm">{item.serviceName}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
