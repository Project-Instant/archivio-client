import { HTMLAttributes, ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { aliases } from "./aliases.js";

type LinkProps = {
  href: string;
  children: ReactNode | string;
} & HTMLAttributes<HTMLAnchorElement>;

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
    <a href={href} className={isActive ? "is-active" : undefined} {...props}>
      {children}
    </a>
  );
}