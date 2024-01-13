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
  const [skipUpdate, setSkipUpdate] = useState(true);
  const [selectedServiceIds, setSelectedServiceIds] = useState(
    counter ? counter.categoryIds : [],
  );

  useEffect(() => {
    setSelectedServiceIds(counter != null ? counter.categoryIds : []);
    setSkipUpdate(true);
  }, [counter]);

  useEffect(() => {
    const fetchData = setTimeout(
      async () => {
        if (!skipUpdate) {
          console.log(selectedServiceIds);
          await updateCounter(counter!.id, { categoryIds: selectedServiceIds });
        } else {
          setSkipUpdate(false);
        }
      },
      skipUpdate ? 0 : 1000,
    );

    return () => clearTimeout(fetchData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServiceIds, counter]);

  return (
    <>
      <Card className="flex flex-col justify-between w-full">
        <CardHeader>
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Counter Control</CardTitle>
              <CardDescription>
                Counter {counter != null ? counter.counterNumber : "0"}
              </CardDescription>
              <Badge
                variant={
                  counter != null
                    ? counter.isOpen
                      ? "outline"
                      : "destructive"
                    : "destructive"
                }
                className="w-fit pointer-events-none"
              >
                {counter != null
                  ? counter.isOpen
                    ? "Open"
                    : "Closed"
                  : "Select a counter"}
              </Badge>
            </div>
            <div>
              <Button
                variant="destructive"
                className={counter?.isOpen ? "" : "hidden"}
                disabled={counter == null}
                onClick={async () => {
                  await updateCounter(counter!.id, { isOpen: false });
                }}
              >
                Close Counter
              </Button>
              <Button
                variant="outline"
                className={counter?.isOpen ? "hidden" : ""}
                disabled={counter == null}
                onClick={async () => {
                  await updateCounter(counter!.id, { isOpen: true });
                }}
              >
                Open Counter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 items-center">
          <div
            className={`flex flex-col items-center transition-colors ${
              counter?.isOpen ? "text-foreground" : "text-muted-foreground/50"
            }`}
          >
            <p className="text-4xl font-bold">
              {counter?.queueHistory[0]?.queueNumber ?? "0"}
            </p>
            <p className="text-xl font-light">
              {counter?.queueHistory[0]?.serviceName ?? "-"}
            </p>
          </div>
          <Button
            disabled={!counter?.isOpen || selectedServiceIds.length === 0}
            variant="outline"
            onClick={async () => {
              await nextQueueNum(counter!, selectedServiceIds);
            }}
          >
            Next Number
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 mt-4 items-start">
          <p className="text-sm text-muted-foreground">
            Select accepted services
          </p>
          <Separator />
          <ToggleGroup
            disabled={!counter?.isOpen}
            type="multiple"
            className="flex flex-wrap justify-start"
            value={selectedServiceIds}
            onValueChange={(values) => setSelectedServiceIds(values)}
          >
            {services.map((service) => (
              <ToggleGroupItem key={service.id!} value={service.id!}>
                {service.name.en}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardFooter>
      </Card>
    </>
  );
}
