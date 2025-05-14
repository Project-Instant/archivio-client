import { reatomComponent } from "@reatom/npm-react";
import { getProfile, profileIsLoadingAtom } from "../models/profile.model";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";

const ProfileTagsSkeleton = () => {
  return (
    <>
      <Skeleton className="w-16 h-6" />
      <Skeleton className="w-12 h-6" />
      <Skeleton className="w-24 h-6" />
    </>
  )
}


export const ProfileTags = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileIsLoadingAtom)) {
    return <ProfileTagsSkeleton />
  }

  const profileTags = getProfile.tags(ctx)
  if (!profileTags) return null;

  return profileTags.map((tag, idx) => (
    <Badge key={idx} variant="secondary">
      {tag}
    </Badge>
  ))
}, "ProfilePageTags")