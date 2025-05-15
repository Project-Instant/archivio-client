import { getCookieValue } from "@/shared/lib/helpers/get-cookie";
import { action, atom, withInit } from "@reatom/framework";
import { withCookie } from "@reatom/persist-web-storage";
import { PageContext } from "vike/types";

export type Theme = "dark" | "light"

export const THEME_KEY_COOKIE = "theme-pref"
export const DEFAULT_THEME = "light"

function parseCookie<T>(cookie: string): T | undefined {
  try {
    const decoded = decodeURIComponent(cookie).replace(/^"|"$/g, "");
    return JSON.parse(decoded);
  } catch {}
}

export const themeAtom = atom<Theme>(DEFAULT_THEME, "theme").pipe(
  withInit(() => {
    const init = getCookieValue("theme")
    return init ? parseCookie<{ data: Theme }>(init)?.data ?? DEFAULT_THEME : DEFAULT_THEME
  }),
  withCookie({ path: "/", maxAge: 99999999999 })(THEME_KEY_COOKIE)
)

export const changeThemeAction = action((ctx) => {
  const currentTheme = ctx.get(themeAtom);
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.body.classList.replace(currentTheme, newTheme)

  themeAtom(ctx, newTheme)
});

export function defineTheme(pageContext: PageContext): Theme {
  const headers = pageContext.headers;
  let theme: Theme = DEFAULT_THEME

  if (headers) {
    const getCookie = headers["cookie"]

    const themeCookie = getCookie.split('; ').find(row => row.startsWith(`${THEME_KEY_COOKIE}=`))
      ?.split('=')[1];

    if (themeCookie) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(themeCookie));

        if (parsedData.data) {
          theme = parsedData.data
        }
      } catch { }
    }
  }

  return theme
}