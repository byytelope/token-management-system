import ButtonLink from "@/components/ButtonLink";
import { getAllServices, getServiceWhere } from "@/lib/dbMethods";
import {
  convertToSlugList,
  dispenseToken,
  getChildServices,
} from "@/lib/utils";
import { IService } from "@/models/service";

export async function generateStaticParams() {
  const services = await getAllServices();
  return convertToSlugList(services);
}

export default async function Service({
  params: { services },
}: {
  params: { services: string[] };
}) {
  const service = await getServiceWhere({
    name: { en: decodeURIComponent(services[0]) },
  });
  const childServices = getChildServices(service as IService, services);

  if (childServices.length === 0) {
    await dispenseToken(services[services.length - 1]);
  }

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
