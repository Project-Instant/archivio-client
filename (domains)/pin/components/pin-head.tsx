import { Skeleton } from "@/shared/ui/skeleton"
import { reatomComponent } from "@reatom/npm-react"
import { pinResource } from "../models/pin.model"
import { PinMoreTools } from "./pin-more-tools"
import { CreatePinComment } from "./pin-create-comment"
import { PinRate } from "./pin-rate"
import { PinSave } from "./pin-save"
import { PinImageTools } from "./pin-image-tools"
import { BackNavigation } from "@/shared/components/navigation/back-navigation"
import { pinIsHiddenAtom } from "../models/pin-actions.model"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Link } from "@/shared/components/link/link"
import { wrapLink } from "@/shared/lib/helpers/wrap-link"
import { PinComments } from "./pin-comments"
import { cva, VariantProps } from "class-variance-authority"
import { HTMLAttributes } from "react"

const PinHeadSkeleton = () => {
  return (
    <div className="flex gap-6 w-full h-full">
      <div className="flex items-start w-1/6 h-full justify-end">
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
      <div className="w-4/6 max-h-[80vh] max-w-[90vw]">
        <div className="flex justify-between gap-6 items-start group relative overflow-hidden h-full max-w-[90vw] max-h-[80vh] w-full">
          <Skeleton className="h-[50vh] w-3/5" />
          <Skeleton className="h-full w-2/5" />
        </div>
      </div>
    </div>
  )
}

export const PinHead = reatomComponent(({ ctx }) => {
  const data = ctx.spy(pinResource.dataAtom)

  if (ctx.spy(pinResource.statusesAtom).isPending) {
    return <PinHeadSkeleton />
  }

  const pin = data?.data
  if (!pin) return null;

  return (
    <PinHeadWrapper variant={ctx.spy(pinIsHiddenAtom) ? "hidden" : null}>
      <div className="hidden lg:flex items-start w-1/6 h-full justify-end">
        <BackNavigation />
      </div>
      <div className="flex flex-col gap-4 w-full h-full lg:h-fit lg:w-4/6 lg:max-h-[80vh] lg:max-w-[90vw]">
        <div className="flex flex-col lg:flex-row h-full justify-center gap-8 items-start overflow-hidden w-full lg:max-h-[60vh]">
          <div className="relative w-full items-center h-full flex justify-center lg:w-auto lg:max-w-3/5 overflow-hidden rounded-3xl">
            <img
              src={pin.fullImage}
              alt={pin.title}
              draggable={false}
              className="object-scale-down w-auto h-auto max-h-[60vh] rounded-3xl block"
            />
            <div className="absolute right-4 bottom-4 z-10">
              <PinImageTools />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full gap-3 w-full lg:w-2/5">
            <div id="header" className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <PinRate />
                  <PinMoreTools />
                </div>
                <PinSave />
              </div>
              <h1 title={pin.title} className="font-bold text-2xl text-foreground truncate">
                {pin.title}
              </h1>
              <Link id="pin-owner" href={wrapLink(pin.owner.login, "user")} className="flex items-center gap-2">
                <Avatar className="min-h-12 min-w-12 max-h-12 max-w-12">
                  <AvatarImage src={pin.owner.avatarUrl ?? undefined} alt={pin.owner.login} />
                  <AvatarFallback>
                    {pin.owner.login[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="font-semibold">{pin.owner.login}</p>
              </Link>
            </div>
            <div id="comments" className="flex flex-col item-start gap-2 w-full h-full">
              <PinComments />
            </div>
            <div id="create-comment" className="flex flex-col gap-2 w-full">
              <p className="text-base text-secondary-foreground font-semibold">
                Ваше мнение?
              </p>
              <CreatePinComment />
            </div>
          </div>
        </div>
      </div>
    </PinHeadWrapper>
  )
}, "PinHead")

const pinHeadWrapperVariants = cva("flex gap-6 w-full h-full", {
  variants: {
    variant: { hidden: "opacity-40 pointer-events-none" }
  }
})

const PinHeadWrapper = ({
  className, variant, ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof pinHeadWrapperVariants>) => {
  return <div className={pinHeadWrapperVariants({ variant, className })} {...props} />
}