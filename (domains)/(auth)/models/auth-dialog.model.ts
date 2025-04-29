import { atom } from "@reatom/core"
import { userResource } from "./user.model"
import { reatomAsync } from "@reatom/async"

export const authDialogAtom = atom(false, "authDialogAtom")

export const openAuthDialogAction = reatomAsync((ctx, state: boolean) => {
  const user = ctx.get(userResource.dataAtom)

  if (user) {
    return ctx.schedule((ctx) => authDialogAtom(ctx, state))
  }

  return ctx.schedule((ctx) => authDialogAtom(ctx, state))
}, "openAuthDialog")