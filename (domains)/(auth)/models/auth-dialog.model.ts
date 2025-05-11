import { atom } from "@reatom/core"
import { currentUserAtom } from "./user.model"
import { reatomAsync } from "@reatom/async"

export const authDialogAtom = atom(false, "authDialogAtom")

export const openAuthDialogAction = reatomAsync(async (ctx, state: boolean) => {
  const user = ctx.get(currentUserAtom)

  if (user) {
    return await ctx.schedule((ctx) => authDialogAtom(ctx, state))
  }

  return await ctx.schedule((ctx) => authDialogAtom(ctx, state))
}, "openAuthDialog")