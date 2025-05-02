import { cva, VariantProps } from "class-variance-authority"
import { HTMLAttributes } from "react"

type ActionItemProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof actionItemVariants>

const actionItemVariants = cva("flex items-center justify-start gap-2 w-full hover:bg-muted-foreground/20 rounded-lg", {
  defaultVariants: {
    size: "default"
  },
  variants: {
    size: {
      default: "px-3 py-4 lg:p-4",
      mini: "px-4 py-2"
    }
  }
})

export const ActionItem = ({ className, size, ...props }: ActionItemProps) => {
  return <div className={actionItemVariants({ size, className })} {...props}/>
}