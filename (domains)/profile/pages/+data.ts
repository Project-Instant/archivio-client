import { PageContextServer } from "vike/types";
import { Profile } from "../models/profile.model";
import AvatarExample from "@/assets/avatar-example.jpg"
import { currentUserData } from "@/(domains)/(auth)/models/user.model";
import { render } from "vike/abort";

export type Data = Awaited<ReturnType<typeof data> & { data: Profile }>;

const EXISTS_USERS: Profile[] = [
  {
    user: {
      login: "pig",
      name: `Realized pig`,
      description: `Travel enthusiast and photographer. Always seeking new adventures and capturing beautiful moments around
        the world. Based in San Francisco, but rarely home.`,
      avatarUrl: AvatarExample,
    },
    collection: { pins: 0, savedPins: 0 },
    followers: 0, following: 0,
    history: { destinations: 0, saved: 1 },
    tags: ["Снаряжение", "Природа", "Урбанизм"]
  },
  {
    user: currentUserData,
    collection: { pins: 0, savedPins: 0 },
    followers: 0, following: 0,
    history: { destinations: 0, saved: 1 },
    tags: ["Фотография", "Тревел",]
  }
]

export async function data(pageContext: PageContextServer) {
  const profile = EXISTS_USERS.find(v => v.user.login === pageContext.routeParams.id)

  if (!profile) {
    throw render("/not-found");
  }

  return {
    id: pageContext.routeParams.id,
    title: profile?.user.login ?? "Не найдено",
    data: profile ?? null
  }
}