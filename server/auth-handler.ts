import { validateAuthentication } from "@/(domains)/(auth)/queries/get-is-auth";

export const AUTH_COOKIE_KEY = "MyCookieAuth";

export async function authHandler(headers: Headers) {
  let result = await validateAuthentication(headers)

  return { isAuth: result }
}