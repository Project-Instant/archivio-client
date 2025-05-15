import { ApiResponse, client } from "@/shared/api/api-client";
import { redirect, render } from "vike/abort";
import { PageContext } from "vike/types";
import { consola } from "consola";

// Status code:
// 1 - auth service is down
// 2 - ok
// 3 - unauthorized
// 4 - forbidden
// 5 - not found
// 6 - internal server error 
// 7 - web service is down
export const validateAuthentication = async (
  headers: Headers | Record<string, string>
): Promise<{ isAuth: boolean, statusCode: number }> => {
  const req = await client.get("auth/check-session", { throwHttpErrors: false, headers });

  if (req.status === 521) {
    return { isAuth: false, statusCode: 1 }
  }

  if (!req.ok) {
    return { isAuth: false, statusCode: 3 }
  }

  const json = await req.json<ApiResponse<string>>();

  if (json.data?.includes("You are authorized")) {
    return { isAuth: true, statusCode: 2 }
  }

  return { isAuth: false, statusCode: 3 }
}

export const guardAuthentication = async (pageContext: PageContext) => {
  consola.info(`Guard`, pageContext.urlParsed.pathname, pageContext.isAuth,  pageContext.statusCode)

  if (pageContext.statusCode === 7) {
    throw render('/development')
  }

  if (pageContext.urlParsed.pathname === '/auth') {
    if (pageContext.isAuth) {
      throw redirect('/homefeed')
    }

  } else {
    if (!pageContext.isAuth) {
      throw redirect('/auth')
    }
  }
}