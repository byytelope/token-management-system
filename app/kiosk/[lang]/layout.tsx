import type { Metadata } from "next";

import Footer from "@/components/custom/footer";

export const metadata: Metadata = {
  title: "TMS | Kiosk",
  description: "Token management system",
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-col flex-grow relative justify-start items-center h-full w-full pt-8 md:pt-16 xl:pt-24 px-12 xl:px-32 mb-32 md:mb-48 gap-8 xl:gap-16">
        {children}
        <Footer />
      </main>
    </>
  );
}
