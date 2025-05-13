import { authDialogAtom } from "@/(domains)/(auth)/models/auth-dialog.model"
import { currentUserAtom } from "@/(domains)/(auth)/models/user.model"
import { Button } from "@/shared/ui/button"
import { reatomAsync } from "@reatom/async"
import { atom } from "@reatom/core"
import { reatomComponent } from "@reatom/npm-react"
import { cva, VariantProps } from "class-variance-authority"
import { Heart } from "lucide-react"

const pinIsRateAtom = atom(false, "pinIsRateAtom")

const ratePinAction = reatomAsync(async (ctx) => {
  if (!ctx.get(currentUserAtom)) {
    return authDialogAtom(ctx, true)
  }

  return await ctx.schedule(() => {
    pinIsRateAtom(ctx, (state) => !state);
  })
})

const pinRateButtonVariants = cva("active:scale-[1.1] group duration-150 rounded-full p-2", {
  defaultVariants: {
    variant: "default"
  },
  variants: {
    variant: {
      default: "bg-transparent hover:bg-transparent text-foreground active:bg-muted-foreground/20",
      rated: "bg-muted-foreground/20 hover:bg-muted-foreground/40 text-red-600",
    }
  }
})

type PinRateButtonProps = React.ComponentProps<"button">
  & VariantProps<typeof pinRateButtonVariants>

const PinRateButton = ({ className, variant, ...props }: PinRateButtonProps) => {
  return (
    <Button className={pinRateButtonVariants({ className, variant })} {...props} />
  )
}

export const PinRate = reatomComponent(({ ctx }) => {
  return (
    <PinRateButton onClick={() => ratePinAction(ctx)} variant={ctx.spy(pinIsRateAtom) ? "rated" : "default"}>
      <Heart fill={ctx.spy(pinIsRateAtom) ? "red" : "none"} size={28} />
    </PinRateButton>
  )
}, "PinRate")