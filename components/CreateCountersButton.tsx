"use client";

import { useRouter } from "next/navigation";

export default function CreateCountersButton() {
  const router = useRouter();

  const createCounters = async () => {
    const numCounters = 3;
    const res = await fetch("/api/counter", {
      method: "POST",
      body: `${numCounters}`,
    });

    const data = await res.json();
    console.log(data);
    router.refresh();
  };

  return (
    <button className="bg-gray-200 px-2 rounded-full" onClick={createCounters}>
      +
    </button>
  );
}
