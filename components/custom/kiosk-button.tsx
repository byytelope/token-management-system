"use client";

import Link from "next/link";
import { Button, ButtonProps } from "../ui/button";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

interface KioskButtonProps {
  dhivehi?: boolean;
  animationDelay?: number;
  href?: string;
  onClick?: ButtonProps["onClick"];
  children: ButtonProps["children"];
}

export default function KioskButton({
  dhivehi = false,
  animationDelay = 0,
  href,
  onClick,
  children,
}: KioskButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant={href != null ? "secondary" : "outline"}
      className="rounded-full w-full text-2xl md:text-4xl xl:text-5xl py-12 md:py-16 xl:py-24 px-8 opacity-0 animate-slide-in"
      style={{ "--delay": `${animationDelay * 0.1}s` } as React.CSSProperties}
      onClick={(e) => {
        setIsLoading(true);
        onClick != null && onClick(e);
      }}
      asChild={href != null}
    >
      {href != null ? (
        <Link href={href} className={`${dhivehi && "font-faruma"}`}>
          {isLoading ? (
            <ReloadIcon className="size-8 animate-spin" />
          ) : (
            children
          )}
        </Link>
      ) : isLoading ? (
        <ReloadIcon className="size-8 animate-spin" />
      ) : (
        children
      )}
    </Button>
  );
}
