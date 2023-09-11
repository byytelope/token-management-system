"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="h-48 px-32 flex justify-between items-center">
      <button
        onClick={() => router.back()}
        className="bg-gray-200 h-24 w-24 rounded-full"
      >
        {"<-"}
      </button>
      <div>AIMS</div>
    </footer>
  );
}
