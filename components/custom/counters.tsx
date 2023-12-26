"use client";

import { Counter } from "@/lib/types";
import CounterCard from "./counter-card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/supabaseTypes";

export default function CounterArea({ counters }: { counters: Counter[] }) {
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
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {counters?.map((counter) => (
          <CounterCard key={counter.id} counter={counter} />
        ))}
      </div>
    </div>
  );
}
