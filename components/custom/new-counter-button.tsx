"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const schema = z.object({
  name: z.string().min(1).max(10),
  serviceIds: z.array(z.string()),
});

export default function NewCounterButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex justify-start gap-2" variant="default">
          <PlusCircledIcon className="size-4" />
          <span className="text-sm font-normal">New counter</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Counter</DialogTitle>
          <DialogDescription>
            Add a new counter. You can edit it after you add as well.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="default" type="submit">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
