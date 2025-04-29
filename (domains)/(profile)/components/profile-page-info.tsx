import { reatomComponent } from "@reatom/npm-react";
import { profileResource } from "../models/profile.model";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/shared/ui/dialog"
import { Edit, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { userResource } from "@/(domains)/(auth)/models/user.model";

type ProfileAvatar = {
  avatarUrl?: string,
  login: string,
  name: string
}

const ProfileAvatar = ({ avatarUrl, login, name }: ProfileAvatar) => {
  return (
    <Dialog>
      <DialogTrigger className="group">
        <Avatar className="min-w-16 min-h-16 w-fit h-fit max-w-36 max-h-36 border-4 border-white">
          <AvatarImage src={avatarUrl} alt="" />
          <div className="group-hover:opacity-100 flex opacity-0 absolute duration-150 bg-black/40 cursor-pointer w-full h-full items-center justify-center">
            <Eye size={20} className="text-neutral-50" />
          </div>
          <AvatarFallback className="text-2xl text-neutral-400">
            {name.split(" ").map(w => w[0]).join("")}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent withClose={false} className="flex flex-col gap-4 bg-transparent p-12 border-none w-fit shadow-none">
        <Avatar className="min-w-48 min-h-48 w-fit h-fit max-w-96 max-h-96 rounded-md">
          <AvatarImage src={avatarUrl} alt="" />
          <AvatarFallback className="text-2xl text-neutral-400">
            {name.split(" ").map(w => w[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <DialogClose className="flex items-center cursor-pointer justify-center h-12 w-full rounded-lg bg-white px-4 py-2">
          <p className="text-neutral-900 font-semibold">
            Закрыть
          </p>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

const ProfilePageDetails = reatomComponent(({ ctx }) => {
  return (
    ctx.spy(profileResource.dataAtom)?.user.login === ctx.spy(userResource.dataAtom)?.login ? (
      <a href="/settings/edit-profile" className="mt-4">
        <Button className="bg-emerald-600 gap-2 hover:bg-emerald-700">
          <Edit size={20} />
          <span className="font-semibold text-neutral-50">
            Изменить профиль
          </span>
        </Button>
      </a>
    ) : (
      <Button className="w-fit px-2 bg-pink-600 gap-2 hover:bg-pink-700">
        <span className="font-semibold text-neutral-50">
          Подписаться
        </span>
      </Button>
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
          <h1 className="text-2xl truncate font-bold text-neutral-900">
            {profile.user.name}
          </h1>
          <p className="text-neutral-500 truncate font-medium mb-2">
            @{profile.user.login}
          </p>
          <ProfilePageDetails />
        </div>
      </div>
    </>
  )
}, "ProfilePageInfo")