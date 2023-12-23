"use client";

import { closeCounter, nextQueueNum, openCounter } from "@/lib/actions";
import { Counter } from "@/lib/types";

export default function CounterCard({ counter }: { counter: Counter }) {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md">
      <div className="flex gap-4 items-center justify-between">
        <p className="text-lg font-bold">Counter {counter.counterNumber}</p>
        <div
          className={`${
            counter.isOpen ? "bg-green-200" : "bg-red-200"
          } rounded-full px-3 py-1`}
        >
          {counter.isOpen ? "Open" : "Closed"}
        </div>
      </div>
      <span>Token number: {`${counter.queueHistory[0] ?? 0}`}</span>
      <span className="flex flex-col gap-4">
        <button
          onClick={async () => {
            await nextQueueNum(counter.id);
          }}
          className="p-2 bg-gray-300 rounded w-full"
        >
          Next
        </button>
        <div className="flex gap-4">
          <button
            onClick={async () => {
              await openCounter(counter.id);
            }}
            className="p-2 bg-gray-300 rounded w-full disabled:bg-gray-200 disabled:text-gray-400"
            disabled={counter.isOpen}
          >
            Open
          </button>
          <button
            onClick={async () => {
              await closeCounter(counter.id);
            }}
            className="p-2 bg-gray-300 rounded w-full disabled:bg-gray-200 disabled:text-gray-400"
            disabled={!counter.isOpen}
          >
            Close
          </button>
        </div>
      </span>
    </div>
  );
}
