import CounterModel from "@/models/counter";
import ServiceModel from "@/models/service";
import dbConnect from "./mongodb";
import QueueItemModel, { QueueItem } from "@/models/queueItem";

export async function getAllServices() {
  await dbConnect();
  return await ServiceModel.find({});
}

export async function getServiceWhere(pService: Record<string, any>) {
  await dbConnect();
  return await ServiceModel.where({}).findOne(pService);
}

export async function getAllCounters() {
  await dbConnect();
  return await CounterModel.find({});
}

export async function createCounters(numCounters: number) {
  await dbConnect();

  const counters = [...Array(numCounters)].map((_, i) => ({
    number: i + 1,
    isOpen: false,
    queueHistory: [],
  }));

  try {
    await CounterModel.create(counters);
  } catch (e) {
    console.error(e);
  }
}

export async function updateCounter(id: string, update: Record<string, any>) {
  await dbConnect();

  try {
    const res = await CounterModel.findByIdAndUpdate(id, update, {
      returnDocument: "after",
    });
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

export async function addQueueItem(queueNumber: number, serviceName: string) {
  await dbConnect();

  try {
    await QueueItemModel.create({
      queueNumber,
      serviceName,
    });
  } catch (e) {
    console.error(e);
  }
}

export async function getFirstQueueItem() {
  await dbConnect();

  try {
    const res = await QueueItemModel.findOne({}).sort({ createdAt: -1 });
    return res;
  } catch (e) {
    console.error(e);
  }
}
