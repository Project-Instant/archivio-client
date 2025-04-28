import { cn } from "@/shared/lib/cn"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-neutral-600", className)}
      {...props}
    />
  )
}

export { Skeleton }
