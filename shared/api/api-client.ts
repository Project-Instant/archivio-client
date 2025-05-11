import ky from "ky";

export type ApiResponse<T> = {
  data: T,
  errorMessage: string | null,
  errorCode: number,
  isSuccess: boolean
}

export const client = ky.extend({
  prefixUrl: "https://archivio.fasberry.su/api",
  credentials: "include"
})