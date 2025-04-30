import { Skeleton } from "@/shared/ui/skeleton"
import { reatomComponent } from "@reatom/npm-react"
import { pinResource } from "../models/pin.model"
import { PinMoreTools } from "./pin-more-tools"
import { CreatePinComment } from "./pin-create-comment"
import { PinRate } from "./pin-rate"
import { PinSave } from "./pin-save"
import { PinImageTools } from "./pin-image-tools"
import { BackNavigation } from "@/shared/components/navigation/back-navigation"

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
  if (ctx.spy(pinResource.statusesAtom).isPending) return <PinHeadSkeleton />

  const data = ctx.spy(pinResource.dataAtom)

  if (!data || ctx.spy(pinResource.statusesAtom).isRejected) return null;

  return (
    <div className="flex gap-6 w-full h-full">
      <div className="flex items-start w-1/6 h-full justify-end">
        <BackNavigation />
      </div>
      <div className="w-4/6 max-h-[80vh] max-w-[90vw]">
        <div
          className="flex justify-between gap-6 items-start group 
            relative overflow-hidden h-full max-w-[90vw] max-h-[80vh] w-full"
        >
          <div className="relative w-3/5">
            <img
              id={data.id}
              src={data.fullImage}
              alt={data.title}
              draggable={false}
              className="object-contain max-w-full max-h-full rounded-3xl"
            />
            <PinImageTools />
          </div>
          <div className="flex flex-col justify-between h-full gap-2 w-2/5">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <PinRate />
                  <PinMoreTools />
                </div>
                <PinSave />
              </div>
              <h1 className="font-bold text-2xl select-none truncate">
                {data.title}
              </h1>
            </div>
            <div className="flex flex-col gap-2 w-full p-1">
              <p className="text-base font-semibold">Ваше мнение?</p>
              <CreatePinComment />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}, "PinHead")