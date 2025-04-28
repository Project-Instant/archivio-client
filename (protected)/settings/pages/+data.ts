import { redirect } from "vike/abort";
import { PageContext } from "vike/types";

export async function data(pageContext: PageContext) {
  if (pageContext.urlPathname === "/settings") {
    throw redirect("/settings/edit-profile")
  }
}