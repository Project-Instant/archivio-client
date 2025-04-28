import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import { aliases } from "@/shared/components/link/aliases";

export default{
  title: "Archivio",
  extends: [vikeReact],
  reactStrictMode: false,
  redirects: { ...aliases },
  ssr: false
} satisfies Config;