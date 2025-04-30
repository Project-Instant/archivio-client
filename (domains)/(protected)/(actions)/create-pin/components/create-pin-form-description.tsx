import { Input } from "@/shared/ui/input"
import { descriptionAtom } from "../models/create-pin.model"
import { reatomComponent } from "@reatom/npm-react"

export const CreatePinFormDescription = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(descriptionAtom)}
      placeholder="Добавьте подробное описание"
      onChange={(e) => descriptionAtom(ctx, e.target.value)}
    />
  )
}, "CreatePinFormDescription")