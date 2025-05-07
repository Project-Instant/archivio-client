import { atom, reatomResource, sleep, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/framework";
import { User } from "@/(domains)/(auth)/models/user.model";
import { PINS } from "@/(domains)/(protected)/homefeed/models/homefeed.model";

export type Profile = {
  user: User,
  followers: number,
  following: number,
  history: {
    destinations: number,
    saved: number
  },
  collection: {
    pins: number,
    savedPins: number
  },
  tags: string[] | null
}

export const profileParamAtom = atom<string | null>(null, "profileParam")

export const profileAtom = atom<Profile | null>(null, "profileAtom")

export const createdPinsResource = reatomResource(async (ctx) => {
  const profileUser = ctx.spy(profileAtom)
  if (!profileUser) return null;

  await sleep(50)

  return await ctx.schedule(() => {
    const pins = PINS.filter(pin => pin.owner.login === profileUser.user.login)

    return pins;
  })
}).pipe(withDataAtom(), withCache(), withErrorAtom(), withStatusesAtom())

const getFollowers = async (v: string) => {
  return [
    { id: "123", login: "pig", name: "Pig Llll" }
  ]
}

export const followersListResource = reatomResource(async (ctx) => {
  const profileParam = ctx.spy(profileParamAtom)
  if (!profileParam) return null;

  return await ctx.schedule(() => getFollowers(profileParam))
}).pipe(withDataAtom(), withCache(), withStatusesAtom())

profileAtom.onChange((ctx, v) => console.log(v))