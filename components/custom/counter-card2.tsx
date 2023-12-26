"use client";

import { closeCounter, nextQueueNum, openCounter } from "@/lib/actions";
import { Counter } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function CounterCard({ counter }: { counter: Counter }) {
  return (
    <Card className="w-max">
      <CardHeader className="flex flex-row items-center justify-between h-16">
        <CardTitle className="text-center">
          Counter {counter.counterNumber}
        </CardTitle>
        {!counter.isOpen && (
          <Badge variant="destructive" className="w-fit !mt-0">
            Closed
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <p className="text-sm">Queue Number: 0</p>
        <Button
          variant="outline"
          className="w-full"
          onClick={async () => {
            await nextQueueNum(counter.id);
          }}
        >
          Next number
        </Button>
      </CardContent>
      <CardFooter className="gap-4">
        <Button
          variant={counter.isOpen ? "destructive" : "ghost"}
          disabled={!counter.isOpen}
          onClick={async () => {
            await closeCounter(counter.id);
          }}
        >
          Close
        </Button>
        <Button
          variant="outline"
          disabled={counter.isOpen}
          onClick={async () => {
            await openCounter(counter.id);
          }}
        >
          Open
        </Button>
      </CardFooter>
    </Card>
  );
}
