import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Service } from "./types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertToSlugList = (
  input: Service[],
  parentSlugs: string[] = [],
): { slug: string[] }[] => {
  const result: { slug: string[] }[] = [];

  for (const service of input) {
    const currentSlugs = [...parentSlugs, encodeURIComponent(service.name!.en)];

    result.push({ slug: currentSlugs });

    if (service.children.length > 0) {
      const childSlugs = convertToSlugList(service.children, currentSlugs);
      result.push(...childSlugs);
    }
  }

  return result;
};

export const extractChildServices = (
  service: Service,
  urlArray: string[],
): Service[] => {
  let current = service;
  let childServices: Service[] = [];

  if (urlArray.length <= 1) {
    return current.children;
  }

  if (service === undefined) {
    return [];
  }

  for (const name of urlArray) {
    const decodedName = decodeURIComponent(name);
    const matchingChild = current.children.find(
      (child) => child.name.en === decodedName,
    );

    if (!matchingChild) {
      continue;
    }

    childServices = matchingChild.children;
    current = matchingChild;
  }

  return childServices;
};
