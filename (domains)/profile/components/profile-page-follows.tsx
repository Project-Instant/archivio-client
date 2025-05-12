import { reatomComponent } from "@reatom/npm-react"
import { profileFollowingAtom } from "../models/profile.model"
import { Users } from "lucide-react"
import { Skeleton } from "@/shared/ui/skeleton"
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"

type FollowsDisplayProps = {
  follows: number
}

const FollowsDisplay = ({ follows }: FollowsDisplayProps) => {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-emerald-600" />
        <p className="text-lg text-muted-foreground">Подписок</p>
      </div>
      <p className="text-lg font-bold">{follows}</p>
    </div>
  )
}

export const ProfileFollows = reatomComponent(({ ctx }) => {
  return ctx.spy(profileFollowingAtom) >= 1 ? (
    <Dialog>
      <DialogTrigger className="w-full group hover:brightness-125 cursor-pointer">
        <FollowsDisplay follows={ctx.spy(profileFollowingAtom)} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center">Подписки</DialogTitle>
      </DialogContent>
    </Dialog>
  ) : <FollowsDisplay follows={ctx.spy(profileFollowingAtom)} />
}, "ProfilePageFollows")