import { pageContextAtom } from "@/(domains)/(auth)/models/user.model";
import { action } from "@reatom/core";
import { navigate } from "vike/client/router";

export const navigateAction = action((ctx, path: string) => {
  const pc = ctx.get(pageContextAtom)
  if (!pc) return null;

  return navigate(path, { pageContext: { isAuth: pc.isAuth } })
})