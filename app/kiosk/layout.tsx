import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const faruma = localFont({
  src: "../faruma.otf",
  display: "swap",
  variable: "--font-faruma",
});

export const metadata: Metadata = {
  title: "TMS | Kiosk",
  description: "Token management solution by yours truly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${faruma.variable} text-2xl md:text-5xl font-medium min-h-[100dvh] flex flex-col justify-between`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster richColors position="bottom-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
