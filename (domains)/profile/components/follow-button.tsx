import { Button } from "@/shared/ui/button"
import { reatomComponent } from "@reatom/npm-react"
import { followAction } from "../models/follow.model"
import { getCurrentUser } from "@/(domains)/(auth)/models/user.model"

type FollowButtonProps = {
  target: string,
  isFollowing: boolean
}

export const FollowButton = reatomComponent<FollowButtonProps>(({
  ctx, target, isFollowing
}) => {
  const currentUser = getCurrentUser(ctx, { throwError: false })
  if (!currentUser) return null;

  if (currentUser.login === target) return null;

  return (
    <Button
      onClick={() => followAction(ctx, target)}
      data-state={isFollowing}
      className="h-9 w-fit bg-foreground rounded-xl px-4 data-[state=true]:bg-emerald-600 data-[state=true]:hover:bg-emerald-700"
    >
      <span className="font-semibold group-data-[state=false]:text-foreground group-data-[state=true]:!text-white group-data-[state=false]:invert text-base">
        {isFollowing ? "Отписаться" : "Подписаться"}
      </span>
    </Button>
  )
}, "FollowButton")