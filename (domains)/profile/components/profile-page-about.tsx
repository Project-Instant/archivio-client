import { reatomComponent } from "@reatom/npm-react";
import { getProfile, profileIsLoadingAtom } from "../models/profile.model";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/ru"
import { Skeleton } from "@/shared/ui/skeleton";

export const ProfileDescription = ({ description }: { description: string }) => {
  return <p className="text-lg text-muted-foreground">{description}</p>
}

export const ProfileCreatedAt = ({ createdAt }: { createdAt: Date }) => {
  const formatted = dayjs(createdAt).locale("ru").format(`С MMM YYYY`)

  return (
    <div className="flex items-center gap-1">
      <Calendar size={16} />
      <span className="text-muted-foreground">{formatted}</span>
    </div>
  )
}

export const ProfileAbout = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileIsLoadingAtom)) return <Skeleton className="h-8 w-48" />

  const profileUser = getProfile.user(ctx)
  if (!profileUser) return null;
  
  return (
    <>
      {profileUser.description && <ProfileDescription description={profileUser.description} />}
      <div className="flex items-center gap-2">
        <ProfileCreatedAt createdAt={profileUser.createdAt} />
      </div>
    </>
  )
}, "ProfileAbout")