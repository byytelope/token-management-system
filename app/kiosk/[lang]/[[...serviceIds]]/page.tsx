import { getChildServices } from "@/lib/utils";
import ButtonLink from "@/components/custom/button-link";

export default async function Service({
  params: { serviceIds },
}: {
  params: { serviceIds?: string[] };
}) {
  const childServices = await getChildServices(
    serviceIds != null ? serviceIds[serviceIds.length - 1] : "",
  );

  return (
    <>
      <h1 className="pb-8 xl:pb-0">Choose a service</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-16 w-full my-auto">
        {childServices.map((service, i) => (
          <ButtonLink
            key={service.id}
            animationDelay={i}
            service={service}
            serviceIds={serviceIds ?? []}
          />
        ))}
      </div>
    </>
  );
}
