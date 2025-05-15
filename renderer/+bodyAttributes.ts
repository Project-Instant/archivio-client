import { defineTheme } from "@/shared/components/theme/theme.model";
import { PageContext } from "vike/types";

export default function (pageContext: PageContext) {
  const theme = defineTheme(pageContext)

  return { class: theme }
}