import ButtonLink from "@/components/ButtonLink";
import { Database } from "@/lib/supabaseTypes";
import { createServerClient } from "@supabase/ssr";

export default async function English() {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
    {
      cookies: {},
    },
  );

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
