import { Input } from "@/shared/ui/input"
import { reatomComponent } from "@reatom/npm-react"
import { pinCommentValueAtom } from "../models/pin.model"

export const CreatePinComment = reatomComponent(({ ctx }) => {
  return (
    <div className="flex w-full">
      <Input
        value={ctx.spy(pinCommentValueAtom)}
        onChange={e => pinCommentValueAtom(ctx, e.target.value)}
        placeholder="Напишите что-нибудь"
        className="rounded-xl p-3 placeholder:text-lg"
      />
    </div>
  )
}, "CreatePinComment")