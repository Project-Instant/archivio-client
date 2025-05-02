import { client } from "@/shared/api/api-client";
import { Response } from "../models/user.model";

export const getIsAuth = async () => {
  const req = await client.get("auth/check-session", { throwHttpErrors: false })
  const json = await req.json<Response>()

  console.log(json)

  if (!req.ok || !json.isSuccess) {
    return false;
  }

  return json.isSuccess;
}