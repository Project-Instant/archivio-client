import ky from "ky";

export const client = ky.extend({
  prefixUrl: "http://5.83.140.22:80/api",
  credentials: "include"
})