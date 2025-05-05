import { client } from "@/shared/api/api-client";
import { Response } from "../models/user.model";

export const validateAuthentication = async (headers: Headers): Promise<boolean> => {
  const req = await client.get("auth/check-session", { throwHttpErrors: false, headers });
  const json = await req.json<Response>();

  if (json.data?.includes("You are authorized")) {
    return true
  }

  return false
}