import { reatomComponent } from "@reatom/npm-react";
import { getProfile, profileIsLoadingAtom } from "../models/profile.model";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Edit, Eye, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { getCurrentUser } from "@/(domains)/(auth)/models/user.model";
import { Link } from "@/shared/components/link/Link";
import { FollowButton } from "./follow-button";

const ProfileAvatarOrigin = reatomComponent(({ ctx }) => {
  const profileUser = getProfile.user(ctx)
  if (!profileUser) return null;

  return (
    <Avatar className="h-36 w-36 md:h-48 md:w-48">
      <AvatarImage src={profileUser.avatarUrl ?? undefined} />
      <div className="absolute opacity-0 group-hover:opacity-100 duration-150 bg-black/40 w-full h-full flex items-center justify-center">
        <Eye size={20} className="text-white" />
      </div>
      <AvatarFallback className="text-2xl">
        {profileUser.login[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}, "ProfileAvatarOrigin")

const ProfileAvatar = reatomComponent(({ ctx }) => {
  const profileUser = getProfile.user(ctx)
  if (!profileUser) return null;

  return profileUser.avatarUrl ? (
    <Dialog>
      <DialogTrigger name="open-avatar" className="group">
        <ProfileAvatarOrigin />
      </DialogTrigger>
      <DialogContent withClose={false} className="flex flex-col gap-4 bg-transparent p-12 border-none w-fit shadow-none">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <Avatar className="min-w-48 min-h-48 w-fit h-fit max-w-96 max-h-96 rounded-md">
          <AvatarImage src={profileUser.avatarUrl ?? undefined} alt={profileUser.login} />
          <AvatarFallback className="text-2xl text-secondary-foreground">
            {profileUser.login[0].toUpperCase()}
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

const ProfileDetails = reatomComponent(({ ctx }) => {
  const currentUser = getCurrentUser(ctx)
  if (!currentUser) return null;

  const profileUser = getProfile.user(ctx)
  if (!profileUser) return null;

  const { login: currentUserLogin } = currentUser
  const { login: profileUserLogin } = profileUser;

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
      <FollowButton isFollowing={false} target={profileUserLogin} />
    )
  )
}, "ProfilePageDetails")

export const ProfileShare = () => {
  return (
    <div className="flex items-center justify-center cursor-pointer invert bg-background rounded-lg size-9">
      <Share size={20} />
    </div>
  )
}

export const ProfileInfoSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2 md:flex-row relative md:items-end w-full">
      <div className="relative z-2 px-4">
        <Skeleton className="h-36 w-36 md:h-48 md:w-48 rounded-full" />
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-36" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </div>
  )
}

export const ProfileInfo = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileIsLoadingAtom)) return <ProfileInfoSkeleton />

  const profileUser = getProfile.user(ctx)
  if (!profileUser) return null;

  return (
    <>
      <div className="flex flex-col gap-y-2 md:flex-row relative md:items-end w-full">
        <div className="relative z-2 px-2 sm:px-4">
          <ProfileAvatar />
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold truncate text-foreground">
              {profileUser.name ?? profileUser.login}
            </h1>
            <p className="text-muted-foreground truncate mb-4">
              @{profileUser.login}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ProfileDetails />
            <ProfileShare />
          </div>
        </div>
      </div>
    </>
  )
}, "ProfilePageInfo")