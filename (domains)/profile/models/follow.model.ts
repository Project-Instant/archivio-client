import { reatomAsync } from "@reatom/async";
import { followersListResource, profileFollowersAtom } from "./profile.model";
import { ApiResponse, experimentalClient } from "@/shared/api/api-client";

async function postFollow(target: string) {
  const res = await experimentalClient.post(`user/${target}/follow`, { throwHttpErrors: false })
  const json = await res.json<ApiResponse<string>>();

  if (!res.ok) {
    throw new Error("Follow error")
  }

  return json.data;
}

export const followAction = reatomAsync(async (ctx, target: string) => {
  return await ctx.schedule(async () => {
    const data = await postFollow(target)
    
    return { target, data }
  })
}, {
  name: "followAction",
  onFulfill: (ctx, res) => {
    // todo: implement update followers length for target and follows for initiator
    const length = followersListResource.dataAtom(ctx, (state) => state ? state.map((follower) => {
      if (follower.login === res.target) {
        follower.isFollowing = !follower.isFollowing;
      }

      return follower;
    }) : [])?.length

    profileFollowersAtom(ctx, (state) => length ? length : state)
  }
})