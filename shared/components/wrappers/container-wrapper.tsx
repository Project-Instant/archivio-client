import { cva, VariantProps } from "class-variance-authority"
import { HTMLAttributes } from "react"

const containerWrapperVariants = cva("container mx-auto", {
  defaultVariants: {
    variant: "screen"
  },
  variants: {
    variant: {
      screen: "min-h-screen",
      none: ""
    }
  }
})

type ContainerWrapperProps = HTMLAttributes<HTMLDivElement> 
  & VariantProps<typeof containerWrapperVariants>

export const ContainerWrapper = ({ variant, className, ...props }: ContainerWrapperProps) => {
  return (
    <div className={containerWrapperVariants({ variant, className })} {...props}/>
  )
}