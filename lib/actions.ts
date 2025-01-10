"use server";

import { connection } from "next/server";

import { getServerClient } from "./supabase/server";
import type { Database } from "./supabase/types";
import type { Counter, QueueItem, Service } from "./types";

export const rpc = async (funcName: keyof Database["public"]["Functions"]) => {
  const client = await getServerClient();
  const { error } = await client.rpc(funcName);

  return { status: error?.code ?? 200, message: error?.message ?? "Success" };
};

export const dispenseToken = async (
  categoryId: string,
  serviceName: string,
) => {
  const client = await getServerClient();
  const { error } = await client
    .from("queue_items")
    .insert({ category_id: categoryId, service_name: serviceName });

  if (error) {
    console.log(error);
    return error.message;
  }

  return `Token dispensed - ${serviceName}`;
};

export const getAllCounters = async (columns?: Array<keyof Counter>) => {
  const client = await getServerClient();
  await connection();

  try {
    const { data: counters, error } = await client
      .from("counters")
      .select(columns ? columns.join() : "*")
      .order("counter_number")
      .returns<Counter[]>();

    if (error) {
      console.error("Supabase Error:", error.message);
      throw new Error("Failed to fetch all counters");
    }

    return counters;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getCounterById = async (id: string) => {
  const client = await getServerClient();
  const { data } = await client
    .from("counters")
    .select("*")
    .eq("id", id)
    .returns<Counter[]>();

  return data![0];
};

export const getAllServices = async (columns?: (keyof Service)[]) => {
  const client = await getServerClient();

  try {
    const { data: services, error } = await client
      .from("services")
      .select(columns ? columns.join() : "*")
      .eq("level", 1)
      .returns<Service[]>();

    if (error) {
      console.error("Supabase Error:", error.message);
      throw new Error(`Failed to fetch all services: ${error.message}`);
    }

    return services;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getServiceById = async (
  serviceId: string,
  columns?: Array<keyof Service>,
) => {
  const client = await getServerClient();

  try {
    const { data, error } = await client
      .from("services")
      .select(columns ? columns.join() : "*")
      .eq("id", serviceId)
      .returns<Partial<Service[]>>();

    if (error) {
      console.error("Supabase Error:", error.message);
      throw new Error(`Failed to fetch service by ID: ${error.message}`);
    }

    return data && data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error(err);
  }
};

export const addCounter = async () => {
  const client = await getServerClient();
  const { data } = await client
    .from("counters")
    .insert({ category_ids: [] })
    .select("*")
    .limit(1)
    .single<Counter>();

  return data;
};

export const updateCounter = async (
  counterId: string,
  update: Partial<Counter>,
) => {
  const client = await getServerClient();
  await client.from("counters").update(update).eq("id", counterId);
};

export const getAllQueueItems = async () => {
  const client = await getServerClient();
  await connection();

  try {
    const { data, error } = await client
      .from("queue_items")
      .select("*")
      .returns<QueueItem[]>();

    if (error) {
      console.error("Supabase Error:", error.message);
      throw new Error(`Failed to fetch all queue items: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const nextQueueNum = async (counter: Counter, selectedIds: string[]) => {
  const client = await getServerClient();
  await connection();

  try {
    const { data: queueItem, error } = await client
      .from("queue_items")
      .select("*")
      .in("category_id", selectedIds)
      .limit(1)
      .single<QueueItem>();

    if (error) {
      console.error("Supabase Error:", error.message);
      throw new Error(`Failed to fetch next queue item: ${error.message}`);
    }

    if (queueItem == null) return;

    await client
      .from("counters")
      .update({
        queue_history: [
          {
            queue_number: queueItem.queue_number,
            service_name: queueItem.service_name,
          },
          ...counter.queue_history,
        ],
      })
      .eq("id", counter.id);

    await client.from("queue_items").delete().eq("id", queueItem.id);
  } catch (err) {
    console.error(err);
  }
};
