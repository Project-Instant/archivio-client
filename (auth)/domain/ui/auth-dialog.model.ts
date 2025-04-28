import { atom, reatomAsync } from "@reatom/framework"
import { userAtom } from "../user/user.model"

type AuthorizeType = "login" | "register"

export const authDialogAtom = atom(false, "authDialogAtom")

export const authorizeTypeAtom = atom<AuthorizeType>("login", "authorizeTypeAtom")

export const openAuthDialogAction = reatomAsync((ctx, state: boolean) => {
  const user = ctx.get(userAtom)

  if (user) {
    return ctx.schedule((ctx) => authDialogAtom(ctx, state))
  }

  return ctx.schedule((ctx) => authDialogAtom(ctx, state))
}, "openAuthDialog")