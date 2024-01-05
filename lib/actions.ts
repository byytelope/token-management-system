"use server";

import { extractChildServices } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Counter, Service } from "./types";
import { supabase } from "./supabase";

export const getChildServices = async (services: string[]) => {
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

export const getAllCounters = async () => {
  const { data: counters } = await supabase
    .from("counters")
    .select("*")
    .order("counterNumber")
    .returns<Counter[]>();
  return counters;
};

export const getAllServices = async () => {
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .returns<Service[]>();
  return services;
};

export const addCounter = async () => {
  await supabase.from("counters").insert({ serviceIds: [] }).select();
};

export const updateCounter = async (
  counterId: string,
  update: Partial<Counter>,
) => {
  await supabase.from("counters").update(update).eq("id", counterId);
};

export const nextQueueNum = async (counterId: string) => {
  // await supabase.from("counters").update({queueHistory})
};
