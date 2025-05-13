import { reatomComponent } from "@reatom/npm-react";
import { profileTagsAtom } from "../models/profile.model";
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
  if (!ctx.spy(profileTagsAtom)) {
    return <ProfileTagsSkeleton />
  }

  const tags = ctx.spy(profileTagsAtom);
  if (!tags) return null;

  return tags.map((tag, idx) => (
    <Badge key={idx} variant="secondary">
      {tag}
    </Badge>
  ))
}, "ProfilePageTags")