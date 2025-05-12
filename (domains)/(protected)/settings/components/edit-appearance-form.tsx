import { changeThemeAction, themeAtom } from "@/shared/components/theme/theme.model";
import { Switch } from "@/shared/ui/switch";
import { reatomComponent } from "@reatom/npm-react";

export const ThemeSwitcher = reatomComponent(({ ctx }) => {
  return (
    <Switch
      checked={ctx.spy(themeAtom) === "dark"}
      value={ctx.spy(themeAtom)}
      onClick={() => changeThemeAction(ctx)}
    />
  )
})