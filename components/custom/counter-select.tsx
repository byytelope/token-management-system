"use client";

import { Button } from "../ui/button";
import { addCounter } from "@/lib/actions";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/lib/utils";

export default function CounterSelect({
  counterInfo,
}: {
  counterInfo: { id: string; counterNumber: number }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      defaultValue={searchParams.get("id") ?? ""}
      onValueChange={(id) => {
        router.push(`${pathname}?${createQueryString("id", id, searchParams)}`);
      }}
    >
      <SelectTrigger className="w-40 bg-background">
        <SelectValue placeholder="Select a counter" />
      </SelectTrigger>
      <SelectContent>
        {counterInfo.length > 0 && (
          <SelectGroup>
            <SelectLabel>Counters</SelectLabel>
            {counterInfo.map((counter) => (
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
              router.refresh();
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
