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
    user: { ...json.data, createdAt: dayjs().toDate() },
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