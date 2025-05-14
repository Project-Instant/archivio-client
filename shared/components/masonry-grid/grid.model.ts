import { atom } from "@reatom/core"
import { withLocalStorage } from "@reatom/persist-web-storage"

export const GRID_COLS_LS_KEY = "grid-cols"

export const COLS_VARIANTS = {
  small: 3,
  medium: 4,
  big: 5
} as const

export type ColsVariant = keyof typeof COLS_VARIANTS

export const DEFAULT_GRID_COLS: ColsVariant = "big"

export const gridColsNameAtom = atom<ColsVariant>(DEFAULT_GRID_COLS, "gridColsNameAtom").pipe(
  withLocalStorage(GRID_COLS_LS_KEY)
)

export const gridColsValueAtom = atom<number>((ctx) => {
  const name = ctx.spy(gridColsNameAtom)

  return COLS_VARIANTS[name] ?? 5
}, "gridColsValueAtom")