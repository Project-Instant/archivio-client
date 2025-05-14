import { COLS_VARIANTS, ColsVariant, gridColsNameAtom } from "@/shared/components/masonry-grid/grid.model";
import { changeThemeAction, themeAtom } from "@/shared/components/theme/theme.model";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/select";
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

export const GridColumnsNumberSelector = reatomComponent(({ ctx }) => {
  const currentCols = ctx.spy(gridColsNameAtom)
  if (!currentCols) return null;

  const variants = Object.entries(COLS_VARIANTS)

  return (
    <Select
      value={currentCols}
      onValueChange={value => gridColsNameAtom(ctx, value as ColsVariant)}
    >
      <SelectTrigger>
        {currentCols}
      </SelectTrigger>
      <SelectContent>
        {variants.map(([name, value]) => (
          <SelectItem
            key={name}
            value={name}
            className="flex items-center justify-between gap-2 w-full"
          >
            <span className="font-semibold text-base">{name}</span>
            <span>{value}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}, "GridColumnsNumberSelector")