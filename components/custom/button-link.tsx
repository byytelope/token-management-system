"use client";

import { Service } from "@/lib/types";
import KioskButton from "./kiosk-button";
import { toast } from "sonner";
import { dispenseToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function ButtonLink({
  service,
  serviceIds,
  animationDelay,
}: { service: Service; serviceIds: string[]; animationDelay?: number }) {
  const router = useRouter();
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
              router.replace("/");
            }
          : undefined
      }
      href={
        isLink
          ? `/english/${serviceIds.length !== 0 ? serviceIds.join("/") : ""}/${
              service.id
            }`
          : undefined
      }
      animationDelay={animationDelay}
    >
      {service.name.en}
    </KioskButton>
  );
}
