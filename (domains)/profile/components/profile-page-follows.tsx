import { reatomComponent } from "@reatom/npm-react"
import { getProfile } from "../models/profile.model"
import { Users } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@/shared/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"

const FollowsDisplay = ({ follows }: { follows: number }) => {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-emerald-400" />
        <p className="text-lg text-muted-foreground">Подписок</p>
      </div>
      <p className="text-lg font-bold">{follows}</p>
    </div>
  )
}

export const ProfileFollows = reatomComponent(({ ctx }) => {
  const profileFollows = getProfile.follows(ctx)

  return profileFollows >= 1 ? (
    <Dialog>
      <DialogTrigger className="w-full group hover:brightness-125 cursor-pointer">
        <FollowsDisplay follows={profileFollows} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center">Подписки</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  ) : <FollowsDisplay follows={profileFollows} />
}, "ProfilePageFollows")