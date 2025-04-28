import { wrapTitle } from "@/shared/lib/wrap-title";
import { Config } from "vike/types";

export default {
  ssr: true,
  title: wrapTitle("Лента")
} satisfies Config