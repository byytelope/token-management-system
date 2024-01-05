"use server";

import { Counter, Service } from "./types";
import { supabase } from "./supabase";

export const dispenseToken = async (
  categoryId: string,
  serviceName: string,
) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return `Token dispensed - ${serviceName} | 0`;
};

export const getAllCounters = async () => {
  const { data: counters } = await supabase
    .from("counters")
    .select("*")
    .order("counterNumber")
    .returns<Counter[]>();
  return counters;
};

export const getAllServices = async (columns?: Array<keyof Service>) => {
  const { data: services } = await supabase
    .from("services")
    .select(columns != null ? columns.join() : "*")
    .eq("level", 1)
    .returns<Service[]>();
  return services ?? [];
};

export const getServiceById = async (
  serviceId: string,
  columns?: Array<keyof Service>,
) => {
  const { data } = await supabase
    .from("services")
    .select(columns != null ? columns.join() : "*")
    .eq("id", serviceId)
    .returns<Partial<Service[]>>();

  if (data != null) return data[0];
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
