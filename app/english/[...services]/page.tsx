import { convertToSlugList } from "@/lib/utils";
import dbConnect from "@/lib/mongodb";
import ServiceModel, { IService, Service } from "@/models/service";
import ButtonLink from "@/components/ButtonLink";

export async function generateStaticParams() {
  await dbConnect();
  const services = (await ServiceModel.find({})) as Service[];

  return convertToSlugList(services);
}

export default async function Service({
  params: { services },
}: {
  params: { services: string[] };
}) {
  await dbConnect();
  const service = (await ServiceModel.where({}).findOne({
    name: { en: decodeURIComponent(services[0]) },
  })) as Service;

  console.log(service);

  const childServices = service.children as IService[];
  if (service!.children.length <= 0) {
    console.log("Token dispensed.");
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
