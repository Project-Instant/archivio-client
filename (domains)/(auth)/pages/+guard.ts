import { redirect } from "vike/abort";
import { GuardAsync } from "vike/types";

export const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
  if (pageContext.isAuth) {
    throw redirect("/homefeed")
  }
}