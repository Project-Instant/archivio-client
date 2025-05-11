import { GuardAsync } from "vike/types";
import { guardAuthentication } from "../queries/validate-authentication";

export const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
  return await guardAuthentication(pageContext)
}