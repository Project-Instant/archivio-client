import { reatomResource, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/async"
import { pinResource } from "./pin.model"
import { currentUserAtom } from "@/(domains)/(auth)/models/user.model"

const defaultData = { clicks: 0, views: 0, saves: 0 }

export const pinAnalyticsResource = reatomResource(async (ctx) => {
  const pinId = ctx.spy(pinResource.dataAtom)?.id
  if (!pinId) return null;

  const isOwner = ctx.spy(pinResource.dataAtom)?.owner.login === ctx.spy(currentUserAtom)?.login
  if (!isOwner) return null

  return await ctx.schedule(() => defaultData)
}).pipe(withDataAtom(), withStatusesAtom(), withErrorAtom(),withCache())