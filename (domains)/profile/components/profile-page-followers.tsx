import { reatomComponent } from "@reatom/npm-react"
import { followersListResource, getProfile } from "../models/profile.model"
import { Users } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { wrapLink } from "@/shared/lib/helpers/wrap-link"
import { Link } from "@/shared/components/link/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Skeleton } from "@/shared/ui/skeleton"
import { FullscreenNotFound } from "@/shared/components/templates/not-found-template"
import { FollowButton } from "./follow-button"

const FollowersListSkeleton = () => {
  return (
    <>
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
    </>
  )
}

const FollowersList = reatomComponent(({ ctx }) => {
  if (ctx.spy(followersListResource.statusesAtom).isPending) {
    return <FollowersListSkeleton/>
  }

  const list = ctx.spy(followersListResource.dataAtom);
  if (!list) return <FullscreenNotFound/>

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto gap-2">
      {list.map(follower => (
        <div key={follower.id} className="flex bg-muted-foreground/20 justify-between py-2 px-4 rounded-xl w-full items-center">
          <DialogClose asChild>
            <Link href={wrapLink(follower.login, "user")} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={follower.avatarUrl ?? undefined} alt={follower.login} />
                <AvatarFallback>{follower.login[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{follower.name ?? follower.login}</span>
            </Link>
          </DialogClose>
          <FollowButton target={follower.login} isFollowing={follower.isFollowing} />
        </div>
      ))}
    </div>
  )
}, "FollowersList")

const FollowersDisplay = ({ followers }: { followers: number }) => {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-emerald-400" />
        <p className="text-lg text-muted-foreground">Подписчиков</p>
      </div>
      <p className="text-lg font-bold">{followers}</p>
    </div>
  )
}

export const ProfileFollowers = reatomComponent(({ ctx }) => {
  const profileFollowers = getProfile.followers(ctx)

  return profileFollowers >= 1 ? (
    <Dialog>
      <DialogTrigger className="w-full group hover:brightness-125 cursor-pointer">
        <FollowersDisplay followers={profileFollowers} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center">Подписчики</DialogTitle>
        <DialogDescription></DialogDescription>
        <FollowersList />
      </DialogContent>
    </Dialog>
  ) : (
    <FollowersDisplay followers={profileFollowers} />
  )
}, "ProfilePageFollowers")