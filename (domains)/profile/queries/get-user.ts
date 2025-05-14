import { ApiResponse, client } from "@/shared/api/api-client";
import { Profile } from "../models/profile.model";
import { User } from "@/(domains)/(auth)/models/user.model";
import { render } from "vike/abort";
import dayjs from "dayjs";

export async function getUser(id: string) {
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
    user: {
      ...json.data,
      createdAt: dayjs().toDate(),
      avatarUrl: json.data.login === 'belkin'
        ? "https://images.unsplash.com/photo-1744195467963-7d73a219a277?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : null,
      coverUrl: json.data.login === 'belkin' 
        ? "https://images.unsplash.com/photo-1746713915201-4eed01ca887a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : null
    },
    collection: {
      pins: 0,
      savedPins: 0
    },
    followers: 1,
    following: 0,
    tags: ["Снаряжение", "Природа", "Урбанизм"]
  }
  
  return profile
}