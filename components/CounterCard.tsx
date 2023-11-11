"use client";

import { Counter } from "@/models/counter";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function CounterCard({ counter }: { counter: Counter }) {
  const router = useRouter();
  const nextQueueNum = async () => {
    // const queueHistory = counter.queueHistory;

    // const nextQueueItemRes = await fetch("/api/queue");

    // const updateRes = await fetch("/api/counter", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ id: counter._id, update: { queueHistory } }),
    // });

    startTransition(() => {
      router.refresh();
    });
  };

  const openCounter = async () => {
    const res = await fetch("/api/counter", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: counter._id, update: { isOpen: true } }),
    });

    const data = await res.json();
    console.log(data);
    startTransition(() => {
      router.refresh();
    });
  };

  const closeCounter = async () => {
    const res = await fetch("/api/counter", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: counter._id, update: { isOpen: false } }),
    });

    const data = await res.json();
    console.log(data);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md">
      <div className="flex gap-4 items-center justify-between">
        <p className="text-lg font-bold">Counter {counter.number}</p>
        <div
          className={`${
            counter.isOpen ? "bg-green-200" : "bg-red-200"
          } rounded-full px-3 py-1`}
        >
          {counter.isOpen ? "Open" : "Closed"}
        </div>
      </div>
      <span>
        Token number: {`${counter.queueHistory[0]?.queueNumber ?? 0}`}
      </span>
      <span className="flex flex-col gap-4">
        <button
          onClick={nextQueueNum}
          className="p-2 bg-gray-300 rounded w-full"
        >
          Next
        </button>
        <div className="flex gap-4">
          <button
            onClick={openCounter}
            className="p-2 bg-gray-300 rounded w-full"
          >
            Open
          </button>
          <button
            onClick={closeCounter}
            className="p-2 bg-gray-300 rounded w-full"
          >
            Close
          </button>
        </div>
      </span>
    </div>
  );
}
