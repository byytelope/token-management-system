"use client";

import { dispenseToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Dispense({
  params: { services },
}: {
  params: { services: string[] };
}) {
  const router = useRouter();
  const service = decodeURIComponent(services[0]);
  const hasDispensedRef = useRef(false);
  const [dispensing, setDispensing] = useState(true);

  useEffect(() => {
    const dispense = async () => {
      if (!hasDispensedRef.current) {
        await dispenseToken(service);
        setDispensing(false);
        hasDispensedRef.current = true;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/");
      }
    };

    return () => {
      dispense();
    };
  }, [service, router]);

  return (
    <>
      {dispensing ? (
        <>
          <h1>Dispensing Token</h1>
          <div>{service}</div>
        </>
      ) : (
        <h1>Token number 0 dispensed</h1>
      )}
    </>
  );
}
