import { Input } from "@/shared/ui/input"
import { reatomComponent } from "@reatom/npm-react"
import { tagAtom } from "../models/create-pin.model"

export const CreatePinFormTag = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(tagAtom)}
      onChange={e => tagAtom(ctx, e.target.value)}
      type="text"
      placeholder="Найдите тег"
    />
  )
}, "CreatePinFormTag")