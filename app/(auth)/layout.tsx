import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/custom/theme-provider";
import Header from "@/components/custom/header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster richColors />
          <Header />
          <main className="px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 w-full h-full flex flex-col flex-grow">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}