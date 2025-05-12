import { reatomAsync } from "@reatom/async";
import { followersListResource, profileFollowersAtom } from "./profile.model";

export const followAction = reatomAsync(async (ctx, target: string) => {
  return await ctx.schedule(() => {
    const length = followersListResource.dataAtom(ctx, (state) => state ? state.map((follower) => {
      if (follower.login === target) {
        follower.isFollowing = !follower.isFollowing;
      }

      return follower;
    }) : [])?.length

    profileFollowersAtom(ctx, (state) => length ? length : state)
  })
})