"use server";

import { Counter, QueueItem, Service } from "./types";
import { getServerClient } from "./supabase";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import type { Database } from "./supabaseTypes";

export const rpc = async (funcName: keyof Database["public"]["Functions"]) => {
  const cookieStore = cookies();
  const client = getServerClient(cookieStore);
  const { error } = await client.rpc(funcName);

  return { status: error?.code ?? 200, message: error?.message ?? "Success" };
};

export const dispenseToken = async (
  categoryId: string,
  serviceName: string,
) => {
  const cookieStore = cookies();
  const client = getServerClient(cookieStore);
  const { error } = await client
    .from("queueItems")
    .insert({ categoryId, serviceName });

  if (error) {
    console.log(error);
    return error.message;
  } else {
    return `Token dispensed - ${serviceName}`;
  }
};

export const getAllCounters = async (columns?: Array<keyof Counter>) => {
  const cookieStore = cookies();
  const client = getServerClient(cookieStore);
  noStore();
  const { data: counters } = await client
    .from("counters")
    .select(columns != null ? columns.join() : "*")
    .order("counterNumber")
    .returns<Counter[]>();
  return counters ?? [];
};

export const getCounterById = async (id: string) => {
  const cookieStore = cookies();
  const client = getServerClient(cookieStore);
  const { data } = await client
    .from("counters")
    .select("*")
    .eq("id", id)
    .returns<Counter[]>();

  return data![0];
};

export const getAllServices = async (columns?: Array<keyof Service>) => {
  const cookieStore = cookies();
  const client = getServerClient(cookieStore);
  const { data: services } = await client
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
  const cookieStore = cookies();
  const client = getServerClient(cookieStore);
  const { data } = await client
    .from("services")
    .select(columns != null ? columns.join() : "*")
    .eq("id", serviceId)
    .returns<Partial<Service[]>>();

  if (data != null) return data[0];
};

export const addCounter = async () => {
  const cookieStore = cookies();
  const client = getServerClient(cookieStore);
  const { data } = await client
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
  const cookieStore = cookies();
  const client = getServerClient(cookieStore);
  await client.from("counters").update(update).eq("id", counterId);
};

export const getAllQueueItems = async () => {
  const cookieStore = cookies();
  const client = getServerClient(cookieStore);
  noStore();
  const { data } = await client
    .from("queueItems")
    .select("*")
    .returns<QueueItem[]>();

  return data;
};

export const nextQueueNum = async (counter: Counter, selectedIds: string[]) => {
  const cookieStore = cookies();
  const client = getServerClient(cookieStore);
  noStore();
  const { data: queueItem } = await client
    .from("queueItems")
    .select("*")
    .in("categoryId", selectedIds)
    .limit(1)
    .single<QueueItem>();

  if (queueItem == null) return;

  await client
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

  await client.from("queueItems").delete().eq("id", queueItem.id);
};
