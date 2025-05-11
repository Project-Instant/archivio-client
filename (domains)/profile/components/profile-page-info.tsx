import { reatomComponent } from "@reatom/npm-react";
import { profileAtom } from "../models/profile.model";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/shared/ui/dialog"
import { Edit, Eye, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { openAuthDialogAction } from "@/(domains)/(auth)/models/auth-dialog.model";
import { reatomAsync } from "@reatom/async";
import { currentUserAtom } from "@/(domains)/(auth)/models/user.model";
import { Link } from "@/shared/components/link/Link";

const ProfileAvatarOrigin = reatomComponent(({ ctx }) => {
  const profile = ctx.spy(profileAtom)
  if (!profile) return null;

  const { avatarUrl, login } = profile.user;

  return (
    <Avatar className="h-36 w-36 md:h-48 md:w-48">
      <AvatarImage src={avatarUrl ?? undefined} />
      <div className="absolute opacity-0 group-hover:opacity-100 duration-150 bg-black/40 w-full h-full flex items-center justify-center">
        <Eye size={20} className="text-white" />
      </div>
      <AvatarFallback className="text-2xl">
        {login[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}, "ProfileAvatarOrigin")

const ProfileAvatar = reatomComponent(({ ctx }) => {
  const profile = ctx.spy(profileAtom)
  if (!profile) return null;

  const { avatarUrl, login } = profile.user;

  return avatarUrl ? (
    <Dialog>
      <DialogTrigger className="group">
        <ProfileAvatarOrigin />
      </DialogTrigger>
      <DialogContent withClose={false} className="flex flex-col gap-4 bg-transparent p-12 border-none w-fit shadow-none">
        <Avatar className="min-w-48 min-h-48 w-fit h-fit max-w-96 max-h-96 rounded-md">
          <AvatarImage src={avatarUrl ?? undefined} />
          <AvatarFallback className="text-2xl text-secondary-foreground">
            {login[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <DialogClose className="flex items-center cursor-pointer justify-center h-12 w-full rounded-lg bg-white px-4 py-2">
          <p className="text-black font-semibold">
            Закрыть
          </p>
        </DialogClose>
      </DialogContent>
    </Dialog>
  ) : (
    <ProfileAvatarOrigin />
  )
}, "ProfileAvatar")

const followAction = reatomAsync(async (ctx) => {
  const currentUser = ctx.get(currentUserAtom)

  if (!currentUser) {
    return openAuthDialogAction(ctx, true)
  }


})

const FollowButton = reatomComponent(({ ctx }) => {
  return (
    <Button onClick={() => followAction(ctx)} className="h-9 w-fit px-2 bg-emerald-600 gap-2 hover:bg-emerald-700">
      <span className="font-semibold text-base text-white">
        Подписаться
      </span>
    </Button>
  )
}, "FollowButton")

const ProfileDetails = reatomComponent(({ ctx }) => {
  const profileData = ctx.spy(profileAtom)
  const currentUser = ctx.spy(currentUserAtom)

  if (!profileData || !currentUser) return null;

  const { login: currentUserLogin } = currentUser
  const { login: profileUserLogin } = profileData.user;

  return (
    profileUserLogin === currentUserLogin ? (
      <Link href="/settings/edit-profile">
        <Button className="h-9 gap-2">
          <Edit size={20} />
          <span className="font-semibold text-base">
            Изменить профиль
          </span>
        </Button>
      </Link>
    ) : (
      <FollowButton />
    )
  )
}, "ProfilePageDetails")

const ProfileInfoSkeleton = () => {
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

export const ProfileShare = () => {
  return (
    <div className="flex items-center justify-center cursor-pointer invert bg-background rounded-lg size-9">
      <Share size={20} />
    </div>
  )
}

export const ProfileInfo = reatomComponent(({ ctx }) => {
  const profile = ctx.spy(profileAtom)
  if (!profile) return null;

  return (
    <div className="flex flex-col gap-y-2 md:flex-row relative md:items-end w-full">
      <div className="relative z-2 px-4">
        <ProfileAvatar />
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold truncate text-foreground">
            {profile.user.name ?? profile.user.login}
          </h1>
          <p className="text-muted-foreground truncate mb-4">
            @{profile.user.login}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ProfileDetails />
          <ProfileShare />
        </div>
      </div>
    </div>
  )
}, "ProfilePageInfo")