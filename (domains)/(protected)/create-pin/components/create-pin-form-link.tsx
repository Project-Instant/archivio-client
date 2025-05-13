import { Input } from "@/shared/ui/input"
import { linkAtom } from "../models/create-pin.model"
import { reatomComponent } from "@reatom/npm-react"
import { MAX_LINK_LENGTH } from "../constants/create-pin-limitations"

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