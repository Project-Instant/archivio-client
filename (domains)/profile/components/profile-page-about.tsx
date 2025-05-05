import { reatomComponent } from "@reatom/npm-react";
import { profileResource } from "../models/profile.model";
import { Skeleton } from "@/shared/ui/skeleton";

const ProfilePageAboutSkeleton = () => {
  return (
    <>
      <Skeleton className="h-8 mb-2 w-24" />
      <Skeleton className="h-8 w-48" />
    </>
  )
}

export const ProfilePageAbout = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileResource.statusesAtom).isPending) {
    return <ProfilePageAboutSkeleton/>
  }

  const about = ctx.spy(profileResource.dataAtom)?.user.about

  if (!about) return null;

  return (
    <>
      <h2 className="mb-2 text-xl font-semibold text-foreground">О себе</h2>
      <p className="text-lg text-muted-foreground">{about}</p>
    </>
  )
}, "ProfilePageAbout")