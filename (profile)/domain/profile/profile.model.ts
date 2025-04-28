import { atom, reatomResource, withCache, withDataAtom, withRetry } from "@reatom/framework";
import { currentUserData, User } from "@/(auth)/domain/user/user.model";
import AvatarExample from "@/assets/avatar-example.jpg"

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

export const paramAtom = atom('', "profileParam")

export const profileResource = reatomResource(async (ctx) => {
  const param = ctx.spy(paramAtom)

  let data: Profile | null = null;

  if (param === 'belkin') {
    data = {
      user: {
        ...currentUserData,
        about: "I'm belkin"
      },
      collection: {
        pins: 0,
        savedPins: 0
      },
      followers: 0,
      following: 0,
      history: {
        destinations: 0,
        saved: 1
      },
      details: null,
      tags: [
        "Фотография",
        "Тревел",
      ]
    }
  } else {
    data = {
      user: {
        login: param,
        name: `Realized ${param}`,
        about: `Travel enthusiast and photographer. Always seeking new adventures and capturing beautiful moments around
            the world. Based in San Francisco, but rarely home.`,
        avatarUrl: AvatarExample
      },
      collection: {
        pins: 0,
        savedPins: 0
      },
      followers: 0,
      following: 0,
      history: {
        destinations: 0,
        saved: 1
      },
      details: null,
      tags: [
        "Снаряжение",
        "Природа",
        "Урбанизм"
      ]
    }
  }

  return ctx.schedule((ctx) => data)
}).pipe(
  withDataAtom(),
  withRetry({
    onReject(ctx, error, retries) {
      if (retries < 4) return 0
    },
  }),
  withCache()
)