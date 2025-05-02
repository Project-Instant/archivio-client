import { Children, ReactNode } from "react"

type MasonryGridProps = {
  children: ReactNode
  columns?: number
}

export function MasonryGrid({ children, columns = 5 }: MasonryGridProps) {
  const childrenArray = Children.toArray(children)
  const columnWrapper: ReactNode[][] = []

  for (let i = 0; i < columns; i++) {
    columnWrapper[i] = []
  }

  for (let i = 0; i < childrenArray.length; i++) {
    const columnIndex = i % columns
    columnWrapper[columnIndex].push(childrenArray[i])
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {columnWrapper.map((column, index) => (
        <div key={index} className="flex flex-col gap-4">
          {column}
        </div>
      ))}
    </div>
  )
}