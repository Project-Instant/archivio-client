import { reatomComponent } from "@reatom/npm-react"
import { getProfile, profileIsLoadingAtom } from "../models/profile.model"
import { Skeleton } from "@/shared/ui/skeleton"

export const ProfileCover = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileIsLoadingAtom)) {
    return <Skeleton className="relative h-[200px] md:h-[300px] w-full rounded-xl overflow-hidden" />
  }

  const profileUser = getProfile.user(ctx)
  if (!profileUser) return null;
  
  return (
    <div className="relative h-[200px] md:h-[300px] w-full rounded-xl overflow-hidden">
      {profileUser?.coverUrl ? (
        <img
          src={profileUser?.coverUrl}
          alt=""
          className="object-cover"
        />
      ) : (
        <div className="bg-muted/20 w-full h-[200px] md:h-[300px] rounded-xl overflow-hidden" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  )
}, "ProfileCover")