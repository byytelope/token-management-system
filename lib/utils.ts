import { type ClassValue, clsx } from "clsx";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { getAllServices, getServiceById } from "./actions";
import type { Service } from "./types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const createQueryString = (
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  return params.toString();
};

export const getChildServices = async (serviceId: string) => {
  const childServices: Service[] = [];

  if (serviceId.trim() === "") {
    childServices.push(...(await getAllServices()));
  } else {
    const service = await getServiceById(serviceId, ["children_ids"]);

    if (service != null) {
      for (const childId of service.children_ids) {
        const childService = await getServiceById(childId);
        if (childService != null) childServices.push(childService);
      }
    }
  }
  return childServices;
};
