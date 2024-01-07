"use server";

import { Counter, QueueItem, Service } from "./types";
import { supabase } from "./supabase";
import { unstable_noStore as noStore } from "next/cache";

export const dispenseToken = async (
  categoryId: string,
  serviceName: string,
) => {
  const { error } = await supabase
    .from("queueItems")
    .insert({ categoryId, serviceName });

  if (error) {
    console.log(error);
    return error.message;
  } else {
    return `Token dispensed - ${serviceName}`;
  }
};

export const getAllCounters = async () => {
  noStore();
  const { data: counters } = await supabase
    .from("counters")
    .select("*")
    .order("counterNumber")
    .returns<Counter[]>();
  return counters ?? [];
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
  const { data } = await supabase
    .from("counters")
    .insert({ categoryIds: [] })
    .select("*")
    .limit(1)
    .single<Counter>();

  return data;
};

export const updateCounter = async (
  counterId: string,
  update: Partial<Counter>,
) => {
  await supabase.from("counters").update(update).eq("id", counterId);
};

export const getAllQueueItems = async () => {
  noStore();
  const { data } = await supabase
    .from("queueItems")
    .select("*")
    .returns<QueueItem[]>();

  return data;
};

export const nextQueueNum = async (counter: Counter, selectedIds: string[]) => {
  noStore();
  const { data: queueItem } = await supabase
    .from("queueItems")
    .select("*")
    .in("categoryId", selectedIds)
    .limit(1)
    .single<QueueItem>();

  if (queueItem == null) return;

  await supabase
    .from("counters")
    .update({
      queueHistory: [
        {
          queueNumber: queueItem.queueNumber,
          serviceName: queueItem.serviceName,
        },
        ...counter.queueHistory,
      ],
    })
    .eq("id", counter.id);

  await supabase.from("queueItems").delete().eq("id", queueItem.id);
};
