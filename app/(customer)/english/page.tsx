import ButtonLink from "@/components/custom/button-link";
import { supabase } from "@/lib/supabase";

export default async function English() {
  const { data } = await supabase.from("services").select("name->en");
  const serviceNames = data!.map((service) => {
    return service.en as string;
  });

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
