import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { reatomComponent } from "@reatom/npm-react";
import { Fullscreen, Minus, Plus } from "lucide-react";
import { PinSave } from "./pin-save";
import { pinFullscreenScaleAtom, pinIsFullscreenAtom, pinResource, scaleAction } from "../models/pin.model";
import { action } from "@reatom/core";
import { authDialogAtom } from "@/(domains)/(auth)/models/auth-dialog.model";
import { currentUserAtom } from "@/(domains)/(auth)/models/user.model";

const PinImageToolsBar = reatomComponent(({ ctx }) => {
  return (
    <div
      className="relative -bottom-2/3 border-2 border-muted-foreground/20
        flex justify-between gap-4 items-center bg-white/20 backdrop-blur-md p-2 rounded-lg w-full z-[60]"
    >
      <div id="controls-scale" className="flex items-center gap-2">
        <div
          onClick={() => scaleAction(ctx, true)}
          className="flex cursor-pointer active:scale-[0.96] bg-foreground/80 rounded-lg p-2"
        >
          <Plus size={22} className="text-foreground invert" />
        </div>
        <div
          onClick={() => scaleAction(ctx, false)}
          className="flex cursor-pointer active:scale-[0.96] bg-foreground/80 rounded-lg p-2"
        >
          <Minus size={22} className="text-foreground invert" />
        </div>
      </div>
      <div id="controls-details" className="flex items-center gap-2">
        <PinSave />
      </div>
    </div>
  )
}, "PinImageToolsBar")

const PinImage = reatomComponent(({ ctx }) => {
  const pin = ctx.spy(pinResource.dataAtom)
  const zoomSteps = ctx.spy(pinFullscreenScaleAtom);

  if (!pin) return null;

  return (
    <img
      draggable={false}
      src={pin.fullImage}
      className="object-contain w-full h-full duration-150 rounded-lg"
      style={{
        transform: `scale(${1 + zoomSteps * 0.1})`,
        transformOrigin: 'center center',
      }}
      alt={pin.title}
    />
  )
}, "PinImage")

const pinControlDialogAction = action((ctx, open: boolean) => {
  if (!ctx.get(currentUserAtom)) {
    return authDialogAtom(ctx, true)
  }

  pinIsFullscreenAtom(ctx, open)
})

export const PinImageTools = reatomComponent(({ ctx }) => {
  return (
    <Dialog open={ctx.spy(pinIsFullscreenAtom)} onOpenChange={v => pinControlDialogAction(ctx, v)}>
      <DialogTrigger className="flex cursor-pointer bg-foreground/80 rounded-lg p-2">
        <Fullscreen size={20} className="text-foreground invert" />
      </DialogTrigger>
      <DialogContent
        className="!bg-transparent h-fit !max-h-[90vh] !shadow-none !border-transparent"
        withClose={false}
      >
        <DialogTitle></DialogTitle>
        <PinImage />
        <PinImageToolsBar />
      </DialogContent>
    </Dialog>
  )
}, "PinTools")