import { getIsAuth } from "@/(domains)/(auth)/queries/get-is-auth";

export async function authHandler() {
  const isAuth = await getIsAuth()
  
  return {
    isAuth
  }
}