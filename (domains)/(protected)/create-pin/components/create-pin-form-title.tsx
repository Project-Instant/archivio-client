import { Input } from "@/shared/ui/input"
import { reatomComponent } from "@reatom/npm-react"
import { titleAtom } from "../models/create-pin.model"
import { MAX_TITLE_LENGTH } from "../constants/create-pin-limitations"

export const CreatePinFormTitle = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(titleAtom) ?? ""}
      maxLength={MAX_TITLE_LENGTH}
      placeholder="Добавьте название"
      onChange={(e) => titleAtom(ctx, e.target.value)}
    />
  )
}, "CreatePinFormTitle")