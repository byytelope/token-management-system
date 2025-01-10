import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "TMS | Home",
  description: "Token management system",
};

export default function HomePage() {
  return (
    <>
      <div className="w-full flex justify-center gap-4">
        <Button asChild variant="outline">
          <Link href="/kiosk">Kiosk</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/display">Display</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/counters">Counters</Link>
        </Button>
      </div>
    </>
  );
}
