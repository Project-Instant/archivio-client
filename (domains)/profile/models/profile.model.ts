import { atom, CtxSpy, reatomAsync, reatomResource, withCache, withComputed, withDataAtom, withErrorAtom, withReset, withStatusesAtom } from "@reatom/framework";
import { User } from "@/(domains)/(auth)/models/user.model";
import { ApiResponse, experimentalClient } from "@/shared/api/api-client";
import { Pin } from "@/(domains)/pin/models/pin.model";
import consola from "consola";

export type Profile = {
  user: User,
  followers: number,
  following: number,
  collection: {
    pins: number,
    savedPins: number
  },
  tags: string[] | null
}

export const profilePrevParamAtom = atom<string | null>(null, "profilePrevParamAtom")
export const profileParamAtom = atom<string | null>(null, "profileParam").pipe(
  withComputed((ctx, state) => profilePrevParamAtom(ctx, state))
)
export const profileFollowersAtom = atom<Profile["followers"]>(0, "profileFollowersAtom").pipe(withReset())
export const profileFollowingAtom = atom<Profile["following"]>(0, "profileFollowingAtom").pipe(withReset())
export const profileUserAtom = atom<Profile["user"] | null>(null, "profileUserAtom").pipe(withReset())
export const profileCollectionAtom = atom<Profile["collection"] | null>(null, "profileCollectionAtom").pipe(withReset())
export const profileTagsAtom = atom<string[] | null>(null, "profileTagsAtom").pipe(withReset())
export const profileIsLoadingAtom = atom<boolean>((ctx) => ctx.spy(profileUserAtom) ? false : true, "profileIsLoading")

profileUserAtom.onChange((_, state) => consola.info("User", state))

export const getProfile = {
  user(ctx: CtxSpy) {
    return ctx.spy(profileUserAtom);
  },
  collection(ctx: CtxSpy) {
    return ctx.spy(profileCollectionAtom);
  },
  tags(ctx: CtxSpy) {
    return ctx.spy(profileTagsAtom);
  },
  followers(ctx: CtxSpy) {
    return ctx.spy(profileFollowersAtom);
  },
  follows(ctx: CtxSpy) {
    return ctx.spy(profileFollowingAtom);
  }
}

profileParamAtom.onChange((ctx, newState) => {
  const prevState = ctx.get(profilePrevParamAtom)

  consola.info(`prev: ${prevState}`, `updated to ${newState}`)

  if (prevState && prevState !== newState) {
    profileFollowersAtom.reset(ctx)
    profileFollowingAtom.reset(ctx)
    profileUserAtom.reset(ctx)
    profileCollectionAtom.reset(ctx)
    profileTagsAtom.reset(ctx)
    return;
  }
})

export const initProfileAction = reatomAsync(async (ctx, data: Profile) => {
  return await ctx.schedule(() => {
    profileCollectionAtom(ctx, data.collection)
    profileTagsAtom(ctx, data.tags)
    profileUserAtom(ctx, data.user)
    profileFollowersAtom(ctx, data.followers)
    profileFollowingAtom(ctx, data.following)
  })
}).pipe(withStatusesAtom())

async function getUserPins(param: string, signal: AbortSignal) {
  const res = await experimentalClient(`user/${param}/get-pins`, { throwHttpErrors: false, signal })
  const json = await res.json<ApiResponse<Pin[] | null>>()

  if (!res.ok || !json.isSuccess) {
    return null;
  }

  return json.data
}

export const createdPinsResource = reatomResource(async (ctx) => {
  const profileUser = ctx.spy(profileUserAtom)
  if (!profileUser) return null;

  return await ctx.schedule(() => getUserPins(profileUser.login, ctx.controller.signal))
}).pipe(withDataAtom(), withCache(), withErrorAtom(), withStatusesAtom())

type Follower = User & {
  isFollowing: boolean
}

async function getUserFollowers(param: string, signal: AbortSignal) {
  const res = await experimentalClient(`user/${param}/get-followers`, { throwHttpErrors: false, signal })
  const json = await res.json<ApiResponse<Follower[] | null>>()

  if (!res.ok) {
    return null;
  }

  return json.data;
}

export const followersListResource = reatomResource(async (ctx) => {
  const profileParam = ctx.spy(profileParamAtom)
  if (!profileParam) return null;

  return await ctx.schedule(() => getUserFollowers(profileParam, ctx.controller.signal))
}).pipe(withDataAtom(), withStatusesAtom())