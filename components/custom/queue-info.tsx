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
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/supabaseTypes";
import { useRouter } from "next/navigation";
import { QueueItem } from "@/lib/types";
import { getAllQueueItems } from "@/lib/actions";

export default function QueueInfo() {
  const router = useRouter();
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllQueueItems();
      setQueueItems(data ?? []);
    };

    fetchData();
  }, [queueItems]);

  useEffect(() => {
    const channel = supabase
      .channel("queue-update-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "queueItems" },
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Queue</CardTitle>
        <CardDescription>Upcoming numbers</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        {queueItems.map((item) => (
          <div key={item.id} className="rounded-lg border p-4">
            <p className="font-semibold text-sm">{item.queueNumber}</p>
            <p className="text-sm">{item.serviceName}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
