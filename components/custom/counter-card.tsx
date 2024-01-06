"use client";

import { Counter, Service } from "@/lib/types";
import { Button } from "../ui/button";
import { nextQueueNum, updateCounter } from "@/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useEffect, useState } from "react";

export default function CounterCard({
  counter,
  services,
}: { counter?: Counter; services: Service[] }) {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  useEffect(() => {
    if (counter) setSelectedServiceIds(counter!.categoryIds);
  }, [counter]);

  return (
    <>
      {counter != null && (
        <Card className="w-full h-full">
          <CardHeader>
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-2">
                <CardTitle>Counter Control</CardTitle>
                <CardDescription>
                  Counter {counter.counterNumber}
                </CardDescription>
                <Badge
                  variant={counter.isOpen ? "outline" : "destructive"}
                  className="w-fit pointer-events-none"
                >
                  {counter.isOpen ? "Open" : "Closed"}
                </Badge>
              </div>
              <div>
                <Button
                  variant="destructive"
                  className={counter.isOpen ? "" : "hidden"}
                  onClick={async () =>
                    await updateCounter(counter.id, { isOpen: false })
                  }
                >
                  Close Counter
                </Button>
                <Button
                  variant="outline"
                  className={counter.isOpen ? "hidden" : ""}
                  onClick={async () =>
                    await updateCounter(counter.id, { isOpen: true })
                  }
                >
                  Open Counter
                </Button>
              </div>
            </div>
            <Separator />
          </CardHeader>
          <CardContent className="flex flex-col gap-8 h-full items-center">
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold">
                {counter.queueHistory[0]?.queueNumber ?? ""}
              </p>
              <p className="text-xl font-light">
                {counter.queueHistory[0]?.serviceName ?? "-"}
              </p>
            </div>
            <Button
              disabled={!counter.isOpen}
              variant="outline"
              onClick={async () => await nextQueueNum(counter)}
            >
              Next Number
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 mt-4 items-start">
            <p className="text-sm">Select accepted services</p>
            <ToggleGroup
              disabled={!counter.isOpen}
              type="multiple"
              className="flex flex-wrap justify-start"
              value={selectedServiceIds}
              onValueChange={async (values) => {
                setSelectedServiceIds(values);
                await updateCounter(counter.id, { categoryIds: values });
              }}
            >
              {services.map((service) => (
                <ToggleGroupItem key={service.id!} value={service.id!}>
                  {service.name.en}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
