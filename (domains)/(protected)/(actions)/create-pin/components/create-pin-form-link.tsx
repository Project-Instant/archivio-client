import { Input } from "@/shared/ui/input"
import { linkAtom } from "../models/create-pin.model"
import { reatomComponent } from "@reatom/npm-react"

export const CreatePinFormLink = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(linkAtom)}
      placeholder="Добавьте ссылку"
      onChange={(e) => linkAtom(ctx, e.target.value)}
    />
  )
}, "CreatePinFormLink")