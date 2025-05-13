import { atom, reatomAsync, reatomResource, sleep, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/framework";
import { User } from "@/(domains)/(auth)/models/user.model";
import { ApiResponse, experimentalClient } from "@/shared/api/api-client";
import { Pin } from "@/(domains)/pin/models/pin.model";

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

export const profileParamAtom = atom<string | null>(null, "profileParam")
export const profileFollowersAtom = atom<Profile["followers"]>(0, "profileFollowersAtom")
export const profileFollowingAtom = atom<Profile["following"]>(0, "profileFollowingAtom")
export const profileUserAtom = atom<Profile["user"] | null>(null, "profileUserAtom")
export const profileCollectionAtom = atom<Profile["collection"] | null>(null, "profileCollectionAtom")
export const profileTagsAtom = atom<string[] | null>(null, "profileTagsAtom")

export const initProfileAction = reatomAsync(async (ctx, data: Profile) => {
  return await ctx.schedule(() => {
    profileCollectionAtom(ctx, data.collection)
    profileTagsAtom(ctx, data.tags)
    profileUserAtom(ctx, data.user)
    profileFollowersAtom(ctx, data.followers)
    profileFollowingAtom(ctx, data.following)
  })
}).pipe(withStatusesAtom())

async function request(param: string, signal: AbortSignal) {
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

  await sleep(50);

  return await ctx.schedule(() => request(profileUser.login, ctx.controller.signal))
}).pipe(withDataAtom(), withCache(), withErrorAtom(), withStatusesAtom())

type Follower = User & {
  isFollowing: boolean
}

export const FOLLOWERS = [
  {
    init: "belkin",
    rec: "aboba1234",
    data: {
      id: 1,
      login: "aboba1234",
      name: null,
      avatarUrl: null,
      createdAt: new Date(),
      description: null,
      isFollowing: true
    },
  },
  {
    init: "belkin",
    rec: "pig",
    data: {
      id: 3,
      login: "Pig Lili",
      name: null,
      avatarUrl: null,
      createdAt: new Date(),
      description: null,
      isFollowing: true
    },
  },
  {
    init: "aboba1234",
    rec: "belkin",
    data: {
      id: 2,
      login: "belkin",
      name: null,
      avatarUrl: null,
      createdAt: new Date(),
      description: null,
      isFollowing: true
    }
  }
]

const getFollowers = async (login: string): Promise<Follower[] | null> => {
  return FOLLOWERS.length >= 1 ? FOLLOWERS.filter(f => f.init === login).map(d => d.data) : null
}

export const followersListResource = reatomResource(async (ctx) => {
  const profileParam = ctx.spy(profileParamAtom)
  if (!profileParam) return null;

  await sleep(100)

  return await ctx.schedule(() => getFollowers(profileParam))
}).pipe(withDataAtom(), withStatusesAtom())