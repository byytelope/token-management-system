import ButtonLink from "@/components/custom/button-link";
import { getChildServices } from "@/lib/actions";
import { Service } from "@/lib/types";

export default async function Service({
  params: { services },
}: {
  params: { services: string[] };
}) {
  const childServices = await getChildServices(services);

  return (
    <>
      <h1>Choose a service</h1>
      <div className="grid grid-cols-2 gap-16 w-full">
        {childServices.map((service) => (
          <ButtonLink
            key={service.name.en + "Sub"}
            href={`${services[0]}/${encodeURIComponent(service.name.en)}`}
          >
            {service.name.en}
          </ButtonLink>
        ))}
      </div>
    </>
  );
}
