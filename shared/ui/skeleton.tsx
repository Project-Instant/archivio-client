import { cn } from "@/shared/lib/cn"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-muted-foreground", className)}
      {...props}
    />
  )
}

export { Skeleton }