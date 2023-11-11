export interface Service {
  id?: string;
  name: {
    [lang: string]: string;
  };
  children: Service[];
}

export function convertToSlugList(
  input: Service[],
  parentSlugs: string[] = [],
): { slug: string[] }[] {
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
}

export function getChildServices(
  service: Service,
  urlArray: string[],
): Service[] {
  let current = service;
  let childServices: Service[] = [];

  if (urlArray.length <= 1) {
    return current.children;
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
}

export async function dispenseToken(serviceName: string) {
  // const firstQueueItem = await getFirstQueueItem();
  // console.log(firstQueueItem);
  // const queueNumber = (firstQueueItem?.queueNumber || 0) + 1;
  // await addQueueItem(queueNumber, serviceName);
  const queueNumber = 0;

  console.log(
    `Token dispensed - ${decodeURIComponent(serviceName)} | ${queueNumber}`,
  );
}
