"use client";

import ButtonLink from "@/components/custom/button-link";
import { getChildServices } from "@/lib/utils";
import { Service } from "@/lib/types";
import { dispenseToken } from "@/lib/actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Service({
  params: { serviceIds },
}: {
  params: { serviceIds?: string[] };
}) {
  const router = useRouter();
  const [childServices, setChildServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const cs = await getChildServices(
        serviceIds != null ? serviceIds[serviceIds.length - 1] : "",
      );

      setChildServices(cs);
    };

    return () => {
      fetchData();
    };
  }, [serviceIds]);

  return (
    <>
      <h1 className="pb-8 xl:pb-0">Choose a service</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-16 w-full my-auto">
        {childServices.map((service, i) => (
          <ButtonLink
            key={service.id}
            onClick={
              service.childrenIds.length === 0
                ? () => {
                    toast.promise(
                      dispenseToken(
                        serviceIds != null ? serviceIds[0] : service.id,
                        service.name.en,
                      ),
                      {
                        loading: "Dispensing token...",
                        success: (data: string) => {
                          return data;
                        },
                        error: "Error",
                      },
                    );
                    router.replace("/");
                  }
                : undefined
            }
            href={
              service.childrenIds.length !== 0
                ? `/english/${serviceIds != null ? serviceIds.join("/") : ""}/${
                    service.id
                  }`
                : undefined
            }
            animationDelay={i}
          >
            {service.name.en}
          </ButtonLink>
        ))}
      </div>
    </>
  );
}
