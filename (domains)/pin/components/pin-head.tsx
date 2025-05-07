import { Skeleton } from "@/shared/ui/skeleton"
import { reatomComponent } from "@reatom/npm-react"
import { pinResource } from "../models/pin.model"
import { PinMoreTools } from "./pin-more-tools"
import { CreatePinComment } from "./pin-create-comment"
import { PinRate } from "./pin-rate"
import { PinSave } from "./pin-save"
import { PinImageTools } from "./pin-image-tools"
import { BackNavigation } from "@/shared/components/navigation/back-navigation"
import { PinAnalytics } from "./pin-analytics"
import { pinIsHiddenAtom } from "../models/pin-actions.model"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Link } from "@/shared/components/link/Link"
import { wrapLink } from "@/shared/lib/wrap-link"
import { PinComments } from "./pin-comments"
import { cva, VariantProps } from "class-variance-authority"
import { HTMLAttributes } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion"

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

const PinHeadOwner = reatomComponent(({ ctx }) => {
  const pin = ctx.spy(pinResource.dataAtom)

  if (!pin || ctx.spy(pinResource.statusesAtom).isRejected) {
    return null;
  }

  return (
    <Link href={wrapLink(pin.owner.login, "user")} className="flex items-center gap-2">
      <Avatar className="min-h-12 min-w-12 max-h-12 max-w-12">
        <AvatarImage src={pin.owner.avatarUrl} />
        <AvatarFallback>
          {pin.owner.name.split(" ").map(w => w[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <p className="font-semibold">{pin.owner.login}</p>
    </Link>
  )
}, "PinHeadOwner")

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

export const PinHead = reatomComponent(({ ctx }) => {
  if (ctx.spy(pinResource.statusesAtom).isPending) {
    return <PinHeadSkeleton />
  }

  const pin = ctx.spy(pinResource.dataAtom)

  if (!pin) return null;

  return (
    <PinHeadWrapper variant={ctx.spy(pinIsHiddenAtom) ? "hidden" : null}>
      <div className="hidden md:flex items-start w-1/6 h-full justify-end">
        <BackNavigation />
      </div>
      <div className="flex flex-col gap-4 w-full md:w-4/6 max-h-[80vh] max-w-[90vw]">
        <PinAnalytics />

        <div className="flex flex-col md:flex-row justify-center gap-8 items-start overflow-hidden w-full max-h-[60vh]">

          <div className="relative w-full md:w-fit md:max-w-3/5 h-full overflow-hidden rounded-3xl">
            <img
              src={pin.fullImage}
              alt={pin.title}
              draggable={false}
              className="w-full h-auto max-h-[60vh] object-contain"
            />
            <div className="absolute right-4 bottom-4">
              <PinImageTools />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full gap-3 w-full md:w-2/5">
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
              <PinHeadOwner />
            </div>
            <div id="comments" className="flex flex-col item-start gap-2 w-full h-full">
              <Accordion type="single" collapsible>
                <AccordionItem value="comments">
                  <AccordionTrigger>
                    <p className="text-base text-secondary-foreground font-semibold">
                      {pin.details.commentsLength
                        ? `${pin.details.commentsLength} комментариев`
                        : 'Еще нет комментариев'
                      }
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <PinComments />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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