import { Input } from "@/shared/ui/input"
import { linkAtom, MAX_LINK_LENGTH } from "../models/create-pin.model"
import { reatomComponent } from "@reatom/npm-react"

export const CreatePinFormLink = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(linkAtom) ?? ""}
      placeholder="Добавьте ссылку"
      maxLength={MAX_LINK_LENGTH}
      onChange={(e) => linkAtom(ctx, e.target.value)}
    />
  )
}, "CreatePinFormLink")