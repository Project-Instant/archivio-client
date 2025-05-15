import { HTMLAttributes, lazy, ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { logImport } from "@/shared/lib/utils/log-import";
import { reatomComponent } from "@reatom/npm-react";
import { checkLinkAction, LINK_ALIASES, nonverifiedLinkDialogIsOpenAtom } from "./link.model";

type LinkProps = HTMLAttributes<HTMLDivElement | HTMLAnchorElement> & {
  href: string;
  children: ReactNode | string;
  validate?: boolean
}

const NonregisteredLinkDialog = lazy(() => {
  const component = import("./non-verified-link-dialog").then(m => ({ default: m.NonregisteredLinkDialog }))
  logImport("NonregisteredLinkDialog", component)
  return component
})

export const Link = reatomComponent<LinkProps>(({
  ctx, href, children, validate = false, ...props
}) => {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);

  if (LINK_ALIASES[href]) {
    href = LINK_ALIASES[href]
  }

  return (
    <>
      {(validate && ctx.spy(nonverifiedLinkDialogIsOpenAtom)) && <NonregisteredLinkDialog />}
      {validate ? (
        <div
          onClick={() => checkLinkAction(ctx, href)}
          className="cursor-pointer select-none"
          data-state={isActive ? "active" : "inactive"}
          {...props}
        >
          {children}
        </div>
      ) : (
        <a
          href={href}
          data-state={isActive ? "active" : "inactive"}
          {...props}
        >
          {children}
        </a>
      )}
    </>
  );
}, "Link")