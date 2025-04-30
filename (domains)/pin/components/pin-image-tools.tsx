import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { reatomComponent, useAction } from "@reatom/npm-react";
import { Fullscreen, Minus, Plus } from "lucide-react";
import { createPortal } from "react-dom";
import { PinSave } from "./pin-save";
import { pinFullscreenScale, pinIsFullscreenAtom, pinResource, scaleAction, selectedPinAtom } from "../models/pin.model";

const PinScale = () => {
  const scale = useAction(scaleAction)

  return (
    <>
      <div onClick={() => scale(true)} className="flex cursor-pointer bg-white/80 rounded-lg p-2">
        <Plus size={26} className="text-neutral-900" />
      </div>
      <div onClick={() => scale(false)} className="flex cursor-pointer bg-white/80 rounded-lg p-2">
        <Minus size={26} className="text-neutral-900" />
      </div>
    </>
  )
}

export const PinImageTools = reatomComponent(({ ctx }) => {
  const pin = ctx.get(pinResource.dataAtom)
  const isFullscreen = ctx.spy(pinIsFullscreenAtom)

  if (!pin) return null;

  return (
    <>
      {isFullscreen && createPortal(
        <>
          <div id="controls-scale" className="fixed z-[60] bottom-4 right-4 flex flex-col gap-4">
            <PinScale />
          </div>
          <div id="controls-details" className="fixed z-[60] top-4 right-4 flex flex-col gap-4">
            <PinSave />
          </div>
        </>,
        document.body
      )}
      <div className="absolute right-4 bottom-4 flex flex-col gap-2">
        <Dialog open={isFullscreen} onOpenChange={v => pinIsFullscreenAtom(ctx, v)}>
          <DialogTrigger className="flex cursor-pointer bg-white/80 rounded-lg p-2">
            <Fullscreen size={20} className="text-neutral-900" />
          </DialogTrigger>
          <DialogContent
            className="!bg-transparent h-fit !max-h-[90vh] !shadow-none !border-transparent"
            withClose={false}
          >
            <img
              draggable={false}
              src={ctx.spy(selectedPinAtom)?.fullImage}
              className="object-contain w-full h-full rounded-xl"
              style={{ scale: ctx.spy(pinFullscreenScale) * 2 }}
              alt={ctx.spy(selectedPinAtom)?.title}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}, "PinTools")