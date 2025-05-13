import { reatomComponent } from "@reatom/npm-react"
import { followersListResource, profileFollowersAtom } from "../models/profile.model"
import { Users } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Button } from "@/shared/ui/button"
import { wrapLink } from "@/shared/lib/helpers/wrap-link"
import { Link } from "@/shared/components/link/Link"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { currentUserAtom } from "@/(domains)/(auth)/models/user.model"
import { followAction } from "../models/follow.model"
import { Skeleton } from "@/shared/ui/skeleton"
import { NotFoundTemplate } from "@/shared/components/templates/not-found-template"

const FollowerActionButton = reatomComponent<{ isFollowing: boolean, userLogin: string }>(({
  isFollowing, userLogin, ctx
}) => {
  const current = ctx.spy(currentUserAtom)
  if (!current) return null;

  if (current.login === userLogin) return null;

  return (
    <Button
      onClick={() => followAction(ctx, userLogin)}
      data-state={isFollowing}
      className="group data-[state=true]:bg-emerald-600 bg-foreground rounded-xl w-fit px-4"
    >
      <span className="font-semibold group-data-[state=false]:text-foreground group-data-[state=true]:text-white group-data-[state=false]:invert text-base">
        {isFollowing ? "Отписаться" : "Подписаться"}
      </span>
    </Button>
  )
}, "FollowerActionButton")

const FollowersListSkeleton = () => {
  return (
    <>
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
    </>
  )
}

const FollowersNotFound = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <NotFoundTemplate />
    </div>
  )
}

const FollowersList = reatomComponent(({ ctx }) => {
  if (ctx.spy(followersListResource.statusesAtom).isPending) {
    return <FollowersListSkeleton/>
  }

  const list = ctx.spy(followersListResource.dataAtom);
  if (!list) return <FollowersNotFound/>;

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto gap-2">
      {list.map(follower => (
        <div key={follower.id} className="flex bg-muted-foreground/20 justify-between py-2 px-4 rounded-xl w-full items-center">
          <DialogClose asChild>
            <Link href={wrapLink(follower.login, "user")} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={follower.avatarUrl ?? undefined} />
                <AvatarFallback>{follower.login[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{follower.name ?? follower.login}</span>
            </Link>
          </DialogClose>
          <FollowerActionButton userLogin={follower.login} isFollowing={follower.isFollowing} />
        </div>
      ))}
    </div>
  )
}, "FollowersList")

type FollowersDisplayProps = {
  followers: number
}

const FollowersDisplay = ({ followers }: FollowersDisplayProps) => {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-emerald-600" />
        <p className="text-lg text-muted-foreground">Подписчиков</p>
      </div>
      <p className="text-lg font-bold">{followers}</p>
    </div>
  )
}

export const ProfileFollowers = reatomComponent(({ ctx }) => {
  return ctx.spy(profileFollowersAtom) >= 1 ? (
    <Dialog>
      <DialogTrigger className="w-full group hover:brightness-125 cursor-pointer">
        <FollowersDisplay followers={ctx.spy(profileFollowersAtom)} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center">Подписчики</DialogTitle>
        <FollowersList />
      </DialogContent>
    </Dialog>
  ) : (
    <FollowersDisplay followers={ctx.spy(profileFollowersAtom)} />
  )
}, "ProfilePageFollowers")