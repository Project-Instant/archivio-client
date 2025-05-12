import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import vikeServer from 'vike-server/config'

export default{
  title: "Archivio",
  clientRouting: true,
  extends: [
    vikeReact, 
    vikeServer
  ],
  reactStrictMode: false,
  ssr: true,
  server: 'server/index.js',
  passToClient: ['isAuth']
} satisfies Config;