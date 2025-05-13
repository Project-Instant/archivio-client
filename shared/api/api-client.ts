import ky from "ky";
import { createKyWithCborSupport } from "./api-utils";

export type ApiResponse<T> = {
  data: T,
  errorMessage: string | null,
  errorCode: number,
  isSuccess: boolean
}

export const experimentalClient = createKyWithCborSupport({
  prefixUrl: "/experimental/v1",
  credentials: "include"
})

export const client = ky.extend({
  prefixUrl: "https://archivio.fasberry.su/api",
  credentials: "include"
})