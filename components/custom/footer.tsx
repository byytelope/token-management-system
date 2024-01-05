"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="fixed bottom-0 left-0 w-full h-fit py-8 xl:py-12 bg-background/20 backdrop-blur px-12 xl:px-32 flex justify-between items-center">
      <Button
        variant="secondary"
        onClick={() => router.back()}
        className="h-24 w-24 text-5xl rounded-full"
      >
        {"<-"}
      </Button>
      <div>AIMS</div>
    </footer>
  );
}
