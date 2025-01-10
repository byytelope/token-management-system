"use client";

import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { dispenseToken } from "@/lib/actions";
import type { Service } from "@/lib/types";
import KioskButton from "./kiosk-button";

export default function ButtonLink({
  service,
  serviceIds,
  animationDelay,
}: { service: Service; serviceIds: string[]; animationDelay?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.split("/")[2];
  const isLink = service && service.children_ids.length !== 0;

  return (
    <KioskButton
      onClick={
        !isLink
          ? () => {
              toast.promise(
                dispenseToken(
                  serviceIds.length !== 0 ? serviceIds[0] : service.id,
                  service.name["en-US"],
                ),
                {
                  loading: "Dispensing token...",
                  success: (data: string) => {
                    return data;
                  },
                  error: "Error",
                },
              );
              router.replace("/kiosk");
            }
          : undefined
      }
      href={
        isLink
          ? `/kiosk/${lang}/${
              serviceIds.length !== 0 ? serviceIds.join("/") : ""
            }/${service.id}`
          : undefined
      }
      animationDelay={animationDelay}
    >
      {service.name["en-US"]}
    </KioskButton>
  );
}
