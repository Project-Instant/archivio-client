import { reatomComponent } from "@reatom/npm-react";
import { profileResource } from "../models/profile.model";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";

const ProfilePageTagsSkeleton = () => {
  return (
    <>
      <Skeleton className="w-16 h-6" />
      <Skeleton className="w-12 h-6" />
      <Skeleton className="w-24 h-6" />
    </>
  )
}

export const ProfilePageTags = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileResource.statusesAtom).isPending) {
    return <ProfilePageTagsSkeleton />
  }

  const tags = ctx.spy(profileResource.dataAtom)?.tags ?? null;
  if (!tags) return null;

  return tags.map((tag, idx) => (
    <Badge key={idx} variant="secondary">
      {tag}
    </Badge>
  ))
}, "ProfilePageTags")