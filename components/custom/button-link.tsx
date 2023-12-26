import Link from "next/link";
import { Button } from "../ui/button";

interface ButtonLinkProps extends React.ComponentPropsWithRef<typeof Link> {
  dhivehi?: boolean;
}

export default function ButtonLink({
  dhivehi = false,

  ...props
}: ButtonLinkProps) {
  return (
    <Button
      variant="secondary"
      className="rounded-full text-5xl py-24 px-8"
      asChild
    >
      <Link {...props} className={`${dhivehi && "font-faruma"}`} />
    </Button>
  );
}
