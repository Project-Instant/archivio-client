import { HTMLAttributes, ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";

type LinkProps = {
  href: string;
  children: ReactNode | string;
} & HTMLAttributes<HTMLAnchorElement>;

const aliases: Record<string, string> = {
  "/settings": "/settings/edit-profile"
}

export function Link({ href, children, ...props }: LinkProps) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;

  const isActive = href === "/"
    ? urlPathname === href
    : urlPathname.startsWith(href);

  if (aliases[href]) {
    href = aliases[href]
  }

  return (
    <a
      href={href}
      data-state={isActive ? "active" : "inactive"}
      {...props}
    >
      {children}
    </a>
  );
}