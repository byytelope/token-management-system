import Link from "next/link";
import { Button, ButtonProps } from "../ui/button";

interface ButtonLinkProps {
  dhivehi?: boolean;
  animationDelay?: number;
  href?: string;
  onClick?: ButtonProps["onClick"];
  children: ButtonProps["children"];
}

export default function ButtonLink({
  dhivehi = false,
  animationDelay = 0,
  href,
  onClick,
  children,
}: ButtonLinkProps) {
  return (
    <Button
      variant={href != null ? "secondary" : "outline"}
      className="rounded-full w-full text-ellipsis text-4xl xl:text-5xl py-16 xl:py-24 px-8 opacity-0 animate-slide-in"
      style={{ "--delay": `${animationDelay * 0.1}s` } as React.CSSProperties}
      onClick={onClick}
      asChild={href != null}
    >
      {href != null ? (
        <Link href={href} className={`${dhivehi && "font-faruma"}`}>
          {children}
        </Link>
      ) : (
        children
      )}
    </Button>
  );
}
