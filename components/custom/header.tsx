"use client";

import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <div className="hidden md:flex border-b px-4 h-16 items-center">
      <ThemeToggle />
    </div>
  );
}
