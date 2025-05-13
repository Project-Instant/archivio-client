import { Input } from "@/shared/ui/input"
import { descriptionAtom } from "../models/create-pin.model"
import { reatomComponent } from "@reatom/npm-react"
import { MAX_DESCRIPTION_LENGTH } from "../constants/create-pin-limitations"

export const CreatePinFormDescription = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(descriptionAtom) ?? ""}
      maxLength={MAX_DESCRIPTION_LENGTH}
      placeholder="Добавьте подробное описание"
      onChange={(e) => descriptionAtom(ctx, e.target.value)}
    />
  )
}, "CreatePinFormDescription")