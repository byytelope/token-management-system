"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Counter } from "@/lib/types";
import { Button } from "../ui/button";
import { addCounter } from "@/lib/actions";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";

export default function CounterSelect({ counters }: { counters: Counter[] }) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a counter" />
      </SelectTrigger>
      <SelectContent>
        {counters !== null && counters!.length > 0 && (
          <SelectGroup>
            <SelectLabel>Counters</SelectLabel>
            {counters.map((counter) => (
              <SelectItem key={counter.id} value={counter.id}>
                Counter {counter.counterNumber}
              </SelectItem>
            ))}
            <Separator className="my-1" />
          </SelectGroup>
        )}
        <SelectGroup>
          <Button
            className="w-full flex gap-2 justify-start pl-2 font-normal"
            variant="ghost"
            onClick={async () => {
              await addCounter();
            }}
          >
            <PlusCircledIcon className="size-4" />
            Add Counter
          </Button>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
