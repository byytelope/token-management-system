"use client";

import { Service } from "@/lib/types";
import KioskButton from "./kiosk-button";
import { toast } from "sonner";
import { dispenseToken } from "@/lib/actions";
import { useRouter, usePathname } from "next/navigation";

export default function ButtonLink({
  service,
  serviceIds,
  animationDelay,
}: { service: Service; serviceIds: string[]; animationDelay?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.split("/")[2];
  const isLink = service && service.childrenIds.length !== 0;

  return (
    <KioskButton
      onClick={
        !isLink
          ? () => {
              toast.promise(
                dispenseToken(
                  serviceIds.length !== 0 ? serviceIds[0] : service.id,
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
      {service.name.en}
    </KioskButton>
  );
}
