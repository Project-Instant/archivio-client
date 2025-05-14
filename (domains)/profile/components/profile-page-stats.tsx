import { reatomComponent } from "@reatom/npm-react"
import { ProfileFollowers } from "./profile-page-followers"
import { ProfileFollows } from "./profile-page-follows"
import { Skeleton } from "@/shared/ui/skeleton"
import { profileIsLoadingAtom } from "../models/profile.model"

export const ProfileStats = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileIsLoadingAtom)) return (
    <Skeleton className="p-6 rounded-xl w-full lg:min-w-1/4 md:w-fit md:max-w-1/3" />
  )

  return (
    <div className="flex flex-col gap-4 bg-secondary p-6 rounded-xl w-full lg:min-w-1/4 md:w-fit md:max-w-1/3">
      <p className="font-semibold text-xl">Статистика</p>
      <ProfileFollows />
      <ProfileFollowers />
    </div>
  )
}, "ProfileStats")