import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

export default{
  title: "Archivio",
  extends: [vikeReact],
  reactStrictMode: false,
  ssr: true,
  passToClient: [
    'isAuth'
  ]
} satisfies Config;