import { Input } from "@/shared/ui/input"
import { descriptionAtom, MAX_DESCRIPTION_LENGTH } from "../models/create-pin.model"
import { reatomComponent } from "@reatom/npm-react"

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