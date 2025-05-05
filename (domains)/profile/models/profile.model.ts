import { atom, reatomResource, sleep, withCache, withDataAtom, withErrorAtom, withRetry, withStatusesAtom } from "@reatom/framework";
import AvatarExample from "@/assets/avatar-example.jpg"
import { currentUserData, User } from "@/(domains)/(auth)/models/user.model";
import { PINS } from "@/(domains)/(protected)/homefeed/models/homefeed.model";

type Profile = {
  user: User & {
    about: string | null
  },
  // todo: 
  // implement profile visibility or something more
  details?: null,
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

export const profileResource = reatomResource(async (ctx) => {
  const param = ctx.spy(profileParamAtom)

  if (!param) return null;

  await sleep(50)

  return await ctx.schedule(async () => {
    let data: Profile | null = null;

    if (param === 'belkin') {
      data = {
        user: { ...currentUserData, about: "I'm belkin" },
        collection: { pins: 0, savedPins: 0 },
        followers: 0, following: 0,
        history: { destinations: 0, saved: 1 },
        details: null,
        tags: ["Фотография", "Тревел",]
      }
    } else {
      data = {
        user: {
          login: param,
          name: `Realized ${param}`,
          about: `Travel enthusiast and photographer. Always seeking new adventures and capturing beautiful moments around
            the world. Based in San Francisco, but rarely home.`,
          avatarUrl: AvatarExample,
          description: null
        },
        collection: { pins: 0, savedPins: 0 },
        followers: 0, following: 0,
        history: { destinations: 0, saved: 1 },
        details: null,
        tags: ["Снаряжение", "Природа", "Урбанизм"]
      }
    }

    // await sleep(50)
    
    return data;
  })
}).pipe(
  withDataAtom(),
  withCache(),
  withRetry({
    onReject(ctx, error, retries) {
      if (retries < 4) return 0
    },
  }),
  withStatusesAtom(),
)

export const createdPinsResource = reatomResource(async (ctx) => {
  const profileUser = ctx.spy(profileResource.dataAtom)
  if (!profileUser) return null;

  const pins = PINS.filter(pin => pin.owner.login === profileUser.user.login)

  await sleep(50)

  return await ctx.schedule(() => pins)
}).pipe(
  withDataAtom(), 
  withCache(), 
  withErrorAtom(),
  withStatusesAtom()
)

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