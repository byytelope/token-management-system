"use client";

import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <div className="hidden md:flex border-b px-8 lg:px-12 xl:px-16 h-16 items-center">
      <ThemeToggle />
    </div>
  );
}
