import { action, atom, reatomResource, sleep, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/framework";
import { User } from "@/(domains)/(auth)/models/user.model";
import { PINS } from "@/(domains)/(protected)/homefeed/models/homefeed.model";

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
export const profileAtom = atom<Omit<Profile, "followers" | "following"> | null>(null, "profileAtom")
export const profileFollowersAtom = atom<number>(0, "profileFollowersAtom")
export const profileFollowingAtom = atom<number>(0, "profileFollowingAtom")

profileFollowingAtom.onChange((ctx, v) => console.log(v))
profileFollowersAtom.onChange((ctx, v) => console.log(v))
profileAtom.onChange((ctx, v) => console.log(v))

export const initProfileAction = action((ctx, data: Profile) => {
  profileAtom(ctx, { collection: data.collection, tags: data.tags, user: data.user })
  profileFollowersAtom(ctx, data.followers)
  profileFollowingAtom(ctx, data.following)
})

export const createdPinsResource = reatomResource(async (ctx) => {
  const profileUser = ctx.spy(profileAtom)
  if (!profileUser) return null;

  await sleep(1500)

  return await ctx.schedule(() => {
    const pins = PINS.filter(pin => pin.owner.login === profileUser.user.login)

    return pins.length ? pins : null;
  })
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

const getFollowers = async (login: string): Promise<Array<Follower>> => {
  return FOLLOWERS.map(f => f.init === login ? f.data : null).filter(f => f !== null) as Array<Follower>
}

export const followersListResource = reatomResource(async (ctx) => {
  const profileParam = ctx.spy(profileParamAtom)
  if (!profileParam) return null;

  await sleep(100)

  return await ctx.schedule(() => getFollowers(profileParam))
}).pipe(withDataAtom(), withStatusesAtom())