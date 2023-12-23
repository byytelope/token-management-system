"use server";

import { extractChildServices } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Service } from "./types";
import { createServerClient } from "@supabase/ssr";
import { Database } from "./supabaseTypes";

const supabase = createServerClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
  {
    cookies: {},
  },
);

export const getChildServices = async (services: string[]) => {
  "use server";

  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("name->>en", decodeURIComponent(services[0]))
    .returns<Service[]>();

  const childServices = extractChildServices(data![0], services);

  if (childServices.length === 0) {
    redirect(`/english/dispense/${services[services.length - 1]}`);
  }

  return childServices;
};

export const dispenseToken = async (serviceName: string) => {
  const queueNumber = 0;
  console.log(`Token dispensed - ${serviceName} | ${queueNumber}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

export const openCounter = async (counterId: string) => {
  await supabase.from("counters").update({ isOpen: true }).eq("id", counterId);
};

export const closeCounter = async (counterId: string) => {
  await supabase.from("counters").update({ isOpen: false }).eq("id", counterId);
};

export const nextQueueNum = async (counterId: string) => {
  // await supabase.from("counters").update({queueHistory})
};
