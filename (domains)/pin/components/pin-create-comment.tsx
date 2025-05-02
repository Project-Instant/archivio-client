import { Input } from "@/shared/ui/input"
import { reatomComponent } from "@reatom/npm-react"
import { pinCommentValueAtom } from "../models/pin.model"
import { Send } from "lucide-react"

export const CreatePinComment = reatomComponent(({ ctx }) => {
  return (
    <div className="flex w-full bg-muted-foreground/30 gap-2 rounded-xl p-1 items-center justify-between">
      <Input
        value={ctx.spy(pinCommentValueAtom)}
        onChange={e => pinCommentValueAtom(ctx, e.target.value)}
        placeholder="Напишите что-нибудь"
        className="rounded-xl p-3 placeholder:text-lg bg-transparent focus-visible:ring-0"
      />
      {ctx.spy(pinCommentValueAtom).length >= 1 && (
        <div className="flex items-center justify-center active:scale-[0.96] cursor-pointer rounded-full bg-emerald-600 p-2">
          <Send size={16} className="text-white rotate-45 relative right-0.5" />
        </div>
      )}
    </div>
  )
}, "CreatePinComment")