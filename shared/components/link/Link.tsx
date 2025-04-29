import { HTMLAttributes, ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";

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

  return (
    <a href={href} className={isActive ? "is-active" : undefined} {...props}>
      {children}
    </a>
  );
}