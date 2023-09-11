import ButtonLink from "@/components/ButtonLink";
import dbConnect from "@/lib/mongodb";
import ServiceModel, { Service } from "@/models/service";

export default async function English() {
  await dbConnect();
  const services = (await ServiceModel.find({})) as Service[];
  const serviceNames = services.map((service) => service.name.en);

  return (
    <>
      <h1>Choose a service</h1>
      <div className="grid grid-cols-2 gap-16 w-full">
        {serviceNames.map((serviceName) => (
          <ButtonLink
            key={serviceName + "service"}
            href={`english/${encodeURIComponent(serviceName)}`}
          >
            {serviceName}
          </ButtonLink>
        ))}
      </div>
    </>
  );
}
