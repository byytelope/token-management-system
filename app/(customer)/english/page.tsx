import ButtonLink from "@/components/ButtonLink";
import { getAllServices } from "@/lib/dbMethods";

export default async function English() {
  const services = await getAllServices();
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
