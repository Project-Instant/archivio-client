import { pageContextAtom } from "@/(domains)/(auth)/models/user.model";
import { reatomAsync } from "@reatom/async";
import { navigate } from "vike/client/router";

export const navigateAction = reatomAsync(async (ctx, path: string) => {
  const pc = ctx.get(pageContextAtom)
  if (!pc) return null;

  return navigate(path, { pageContext: { isAuth: pc.isAuth } })
})