"use client";

import { ThemeToggle } from "./theme-toggle";

export default function Header() {
	return (
		<div className="hidden md:flex border-b px-4 sm:px-8 lg:px-12 xl:px-16 h-16 items-center justify-between">
			<p className="text-2xl font-medium">TMS</p>
			<ThemeToggle />
		</div>
	);
}
