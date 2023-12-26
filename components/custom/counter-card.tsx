import { Counter } from "@/lib/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function CounterCard({ counter }: { counter: Counter }) {
  return (
    <Button
      className="w-max h-max flex flex-col items-start rounded-lg gap-4 p-4"
      variant="outline"
    >
      <div className="flex items-center gap-4">
        <p className="font-semibold">Counter {counter.counterNumber}</p>
      </div>
      <p className="text-sm">Queue Number: 0</p>
      {!counter.isOpen && (
        <Badge
          variant="destructive"
          className="w-fit !mt-0 pointer-events-none"
        >
          Closed
        </Badge>
      )}
    </Button>
  );
}
