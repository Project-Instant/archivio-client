import { action, atom, withInit } from "@reatom/framework";
import { withCookie } from "@reatom/persist-web-storage";

export const cookieThemeKey = "theme-pref"

type Theme = "dark" | "light"

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(";").shift() : undefined;
};

function parseCookie<T>(cookie: string): T | undefined {
  try {
    const decoded = decodeURIComponent(cookie).replace(/^"|"$/g, "");
    return JSON.parse(decoded);
  } catch (e) {}
}

export const themeAtom = atom<Theme>("light", "theme").pipe(
  withInit(() => {
    const initTheme = getCookie("theme") ?? "light"

    if (initTheme) {
      const parsedTheme = parseCookie<{ data: Theme }>(initTheme)?.data

      return parsedTheme === "dark" || parsedTheme === "light" ? parsedTheme : "light";
    }
    
    return "light"
  }),
  withCookie()(cookieThemeKey)
)

export const changeThemeAction = action((ctx) => {
  const currentTheme = ctx.get(themeAtom);
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.body.classList.toggle("dark", newTheme === "dark");

  return ctx.schedule((ctx) => themeAtom(ctx, newTheme));
});