import { IService } from "@/models/service";

export function convertToSlugList(
  input: IService[],
  parentSlugs: string[] = []
): { slug: string[] }[] {
  const result: { slug: string[] }[] = [];

  for (const service of input) {
    const currentSlugs = [...parentSlugs, encodeURIComponent(service.name.en)];

    result.push({ slug: currentSlugs });

    if (service.children.length > 0) {
      const childSlugs = convertToSlugList(service.children, currentSlugs);
      result.push(...childSlugs);
    }
  }

  return result;
}
