import { authDialogIsOpenAtom } from "@/(domains)/(auth)/models/auth-dialog.model"
import { currentUserAtom } from "@/(domains)/(auth)/models/user.model"
import { Button } from "@/shared/ui/button"
import { reatomAsync } from "@reatom/async"
import { atom } from "@reatom/core"
import { reatomComponent } from "@reatom/npm-react"
import { pinResource } from "../models/pin.model"

const pinIsSaveAtom = atom(false, "pinIsSaveAtom")

const pinSaveAction = reatomAsync(async (ctx) => {
  if (!ctx.get(currentUserAtom)) {
    return authDialogIsOpenAtom(ctx, true)
  }

  const currentPinId = ctx.get(pinResource.dataAtom)?.data?.id
  if (!currentPinId) return;

  return await ctx.schedule(() => {
    pinIsSaveAtom(ctx, (state) => !state);
  })
})

export const PinSave = reatomComponent(({ ctx }) => {
  return (
    <Button
      onClick={() => pinSaveAction(ctx)}
      className="px-4 w-fit bg-emerald-600 text-white text-lg hover:bg-emerald-700 font-semibold"
    >
      {ctx.spy(pinIsSaveAtom) ? "Удалить" : "Сохранить"}
    </Button>
  )
}, "PinSave")