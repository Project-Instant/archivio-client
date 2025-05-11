import { validateAuthentication } from "@/(domains)/(auth)/queries/validate-authentication";
import { PageContext } from "vike/types";

export async function onCreatePageContext(pageContext: PageContext) {
  if (!pageContext.headers) return

  const data = await validateAuthentication(pageContext.headers)

  pageContext.isAuth = data.isAuth
  pageContext.statusCode = data.statusCode
}