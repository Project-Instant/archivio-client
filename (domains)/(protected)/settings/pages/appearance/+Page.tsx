import { changeThemeAction, themeAtom } from "@/shared/components/theme/theme.model";
import { Switch } from "@/shared/ui/switch";
import { reatomComponent, useAction } from "@reatom/npm-react";

const ThemeSwitcher = reatomComponent(({ ctx }) => {
  const toggleTheme = useAction(changeThemeAction);

  return (
    <Switch
      checked={ctx.spy(themeAtom) === "dark"}
      value={ctx.spy(themeAtom)}
      onClick={toggleTheme}
    />
  )
})

export default function ApperancePage() {
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <div className="flex flex-col w-full h-full gap-2">
        <h1 className="text-xl font-bold text-foreground">
          Персонализация
        </h1>
        <p className="text-lg text-muted-foreground">
          Здесь можно настроить внешний вид приложения
        </p>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-foreground font-semibold text-lg">Тема</p>
        <ThemeSwitcher />
      </div>
    </div>
  )
}