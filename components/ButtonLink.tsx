import Link from "next/link";

interface ButtonLinkProps extends React.ComponentPropsWithRef<typeof Link> {
  dhivehi?: boolean;
}

export default function ButtonLink({
  dhivehi = false,

  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`${
        dhivehi && "font-faruma"
      } font-semibold flex flex-col justify-center items-center text-center text-5xl rounded-full bg-gray-200 py-16 px-8`}
    />
  );
}
