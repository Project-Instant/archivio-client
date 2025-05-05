import ky from "ky";

export const client = ky.extend({
  prefixUrl: "https://archivio.fasberry.su/api",
  credentials: "include"
})