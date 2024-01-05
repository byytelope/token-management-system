import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Service } from "./types";
import { getAllServices, getServiceById } from "./actions";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getChildServices = async (serviceId: string) => {
  const childServices: Service[] = [];

  if (serviceId.trim() === "") {
    childServices.push(...(await getAllServices()));
  } else {
    const service = await getServiceById(serviceId, ["childrenIds"]);

    if (service != null) {
      for (const childId of service.childrenIds) {
        const childService = await getServiceById(childId);
        if (childService != null) childServices.push(childService);
      }
    }
  }
  return childServices;
};
