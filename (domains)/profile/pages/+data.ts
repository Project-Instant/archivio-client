import { PageContextServer } from "vike/types";
import { Profile } from "../models/profile.model";
import { User } from "@/(domains)/(auth)/models/user.model";
import { render } from "vike/abort";
import { ApiResponse, client } from "@/shared/api/api-client";

export type Data = Awaited<ReturnType<typeof data> & { data: Profile }>;

async function getUser(id: string) {
  const res = await client.get(`user/get-user/${id}`, { throwHttpErrors: false })

  let json = await res.json<ApiResponse<User>>()
  let profile: Profile | null = null;
  
  if (!json.data || !json.isSuccess) {
    if (json.errorMessage === 'User Not Found') {
      throw render("/not-found");
    }

    throw render("/error")
  }

  profile = {
    user: json.data,
    collection: { 
      pins: 0, 
      savedPins: 0 
    },
    followers: 1, 
    following: 0,
    history: { 
      destinations: 0, 
      saved: 1 
    },
    tags: ["Снаряжение", "Природа", "Урбанизм"]
  }

  return profile
}

export async function data(pageContext: PageContextServer) {
  const data = await getUser(pageContext.routeParams.id)

  return {
    id: pageContext.routeParams.id,
    title: data?.user.login ?? "Не найдено",
    data
  }
}