import { reatomResource, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/async"
import { pinResource } from "./pin.model"
import { getCurrentUser } from "@/(domains)/(auth)/models/user.model"

const defaultData = { clicks: 0, views: 0, saves: 0 }

export const pinAnalyticsResource = reatomResource(async (ctx) => {
  const pinId = ctx.spy(pinResource.dataAtom)?.data?.id
  if (!pinId) return null;

  const currentUser = getCurrentUser(ctx)
  const pinOwner = ctx.spy(pinResource.dataAtom)?.data?.owner
  if (!pinOwner) return null;

  const isOwner = pinOwner?.login === currentUser.login

  if (!isOwner) return null;

  return await ctx.schedule(() => defaultData)
}).pipe(withDataAtom(), withStatusesAtom(), withErrorAtom(),withCache())