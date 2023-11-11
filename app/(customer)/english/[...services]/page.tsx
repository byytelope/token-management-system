import ButtonLink from "@/components/ButtonLink";
import { supabase } from "@/lib/supabase";
import {
  convertToSlugList,
  dispenseToken,
  getChildServices,
  Service,
} from "@/lib/utils";

export async function generateStaticParams() {
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .returns<Service[]>();
  return convertToSlugList(services!);
}

export default async function Service({
  params: { services },
}: {
  params: { services: string[] };
}) {
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("name->>en", decodeURIComponent(services[0]))
    .returns<Service[]>();

  const childServices = getChildServices(data![0], services);
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
