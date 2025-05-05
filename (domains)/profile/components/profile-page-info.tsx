import { reatomComponent, useAction } from "@reatom/npm-react";
import { profileResource } from "../models/profile.model";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/shared/ui/dialog"
import { Edit, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { userResource } from "@/(domains)/(auth)/models/user.model";
import { openAuthDialogAction } from "@/(domains)/(auth)/models/auth-dialog.model";
import { reatomAsync } from "@reatom/async";

type ProfileAvatar = {
  avatarUrl?: string,
  login: string,
  name: string
}

const ProfileAvatar = ({ avatarUrl, login, name }: ProfileAvatar) => {
  return (
    <Dialog>
      <DialogTrigger className="group">
        <Avatar className="min-w-16 min-h-16 w-fit h-fit max-w-36 max-h-36">
          <AvatarImage src={avatarUrl} alt="" />
          <div className="group-hover:opacity-100 flex opacity-0 absolute duration-150 bg-black/40 cursor-pointer w-full h-full items-center justify-center">
            <Eye size={20} className="text-white" />
          </div>
          <AvatarFallback className="text-2xl text-muted-foreground">
            {name.split(" ").map(w => w[0]).join("")}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent withClose={false} className="flex flex-col gap-4 bg-transparent p-12 border-none w-fit shadow-none">
        <Avatar className="min-w-48 min-h-48 w-fit h-fit max-w-96 max-h-96 rounded-md">
          <AvatarImage src={avatarUrl} alt="" />
          <AvatarFallback className="text-2xl text-secondary-foreground">
            {name.split(" ").map(w => w[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <DialogClose className="flex items-center cursor-pointer justify-center h-12 w-full rounded-lg bg-white px-4 py-2">
          <p className="text-black font-semibold">
            Закрыть
          </p>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

const followAction = reatomAsync(async (ctx) => {
  const currentUser = ctx.get(userResource.dataAtom)

  if (!currentUser) {
    return openAuthDialogAction(ctx, true)
  }
  
  // todo: implement follow logic
})

const FollowButton = reatomComponent(({ ctx }) => {
  const follow = useAction(followAction)

  return (
    <Button onClick={follow} className="w-fit px-2 bg-pink-600 gap-2 hover:bg-pink-700">
      <span className="font-semibold text-white">
        Подписаться
      </span>
    </Button>
  )
}, "FollowButton")

const ProfilePageDetails = reatomComponent(({ ctx }) => {
  const profileData = ctx.spy(profileResource.dataAtom)
  const currentUser = ctx.spy(userResource.dataAtom)

  if (!profileData || !currentUser) return null;

  return (
    profileData.user.login === currentUser.login ? (
      <a href="/settings/edit-profile">
        <Button className="bg-emerald-600 gap-2 hover:bg-emerald-700">
          <Edit size={20} />
          <span className="font-semibold text-white">
            Изменить профиль
          </span>
        </Button>
      </a>
    ) : (
      <FollowButton/>
    )
  )
}, "ProfilePageDetails")

export const ProfilePageInfoSkeleton = () => {
  return (
    <div className="flex relative items-center w-full py-2 gap-4">
      <Skeleton className="min-w-16 min-h-16 w-28 h-28 max-w-36 max-h-36 relative rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-48" />
      </div>
    </div>
  )
}

export const ProfilePageInfo = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileResource.statusesAtom).isPending) return <ProfilePageInfoSkeleton />

  const profile = ctx.spy(profileResource.dataAtom)
  if (!profile) return null;

  return (
    <>
      <div className="flex relative items-center w-full py-2 gap-4">
        <ProfileAvatar
          login={profile.user.login}
          name={profile.user.name}
          avatarUrl={profile.user.avatarUrl ?? undefined}
        />
        <div className="flex flex-col">
          <h1 className="text-2xl truncate font-bold text-foreground">
            {profile.user.name}
          </h1>
          <p className="text-muted-foreground truncate font-medium mb-4">
            @{profile.user.login}
          </p>
          <ProfilePageDetails />
        </div>
      </div>
    </>
  )
}, "ProfilePageInfo")