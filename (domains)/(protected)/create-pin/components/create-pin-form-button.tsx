import { Button } from "@/shared/ui/button"
import { isValidAtom, uploadPinAction } from "../models/create-pin.model"
import { reatomComponent } from "@reatom/npm-react"

export const CreatePinButton = reatomComponent(({ ctx }) => {
  return (
    <Button
      onClick={() => uploadPinAction(ctx)}
      disabled={!ctx.spy(isValidAtom)}
      className="hover:bg-emerald-700 bg-emerald-600"
    >
      <span className="text-white text-lg font-semibold">
        Создать пин
      </span>
    </Button>
  )
}, "CreatePinButton")