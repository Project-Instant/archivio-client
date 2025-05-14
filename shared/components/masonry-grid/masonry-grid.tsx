import { reatomComponent } from "@reatom/npm-react"
import { Children, PropsWithChildren, ReactNode } from "react"
import { gridColsValueAtom } from "./grid.model"
import clsx from "clsx"

export const MasonryGrid = reatomComponent<PropsWithChildren>(({ children, ctx }) => {
  const childrenArray = Children.toArray(children)
  const columnWrapper: ReactNode[][] = []
  const columns = ctx.spy(gridColsValueAtom)

  for (let i = 0; i < columns; i++) {
    columnWrapper[i] = []
  }

  for (let i = 0; i < childrenArray.length; i++) {
    const columnIndex = i % columns
    columnWrapper[columnIndex].push(childrenArray[i])
  }

  const gridClass = clsx(
    'grid gap-4',
    {
      'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5': columns === 5,
      'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4': columns === 4,
      'grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3': columns === 3,
    }
  )

  return (
    <div className={gridClass}>
      {columnWrapper.map((column, index) => (
        <div key={index} className="flex flex-col gap-4">
          {column}
        </div>
      ))}
    </div>
  )
})