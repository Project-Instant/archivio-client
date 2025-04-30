import { reatomComponent } from "@reatom/npm-react"
import { paramAtom, profileResource } from "../models/profile.model"
import { Card, CardContent } from "@/shared/ui/card"
import { Users } from "lucide-react"
import { Skeleton } from "@/shared/ui/skeleton"
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog"
import { Button } from "@/shared/ui/button"
import { reatomResource, withCache, withDataAtom, withStatusesAtom } from "@reatom/async"
import { sleep } from "@reatom/framework"

const followersList = reatomResource(async (ctx) => {
  const param = ctx.get(paramAtom)

  return await ctx.schedule(async () => {
    const getFollowers = async (v: string) => {
      return [
        { id: "123", login: "pig", name: "Pig Llll" }
      ]
    }

    await sleep(100)

    return await getFollowers(param)
  })
}).pipe(withDataAtom(), withCache(), withStatusesAtom())

const FollowersList = reatomComponent(({ ctx }) => {
  const list = ctx.spy(followersList.dataAtom);

  if (!list) return null;

  return (
    list.map(follower => (
      <div className="flex bg-neutral-400/20 justify-between p-2 rounded-xl w-full items-center">
        <a href={`/u/${follower.login}`}>
          <span>{follower.name}</span>
        </a>
        <Button className="bg-neural-800 rounded-xl w-fit px-4">
          <span className="font-semibold text-base">Подписаться</span>
        </Button>
      </div>
    ))
  )
}, "FollowersList")

type FollowersDisplayCardProps = {
  followers: number
}

const FollowersDisplayCard = ({ followers }: FollowersDisplayCardProps) => {
  return (
    <CardContent className="flex items-center gap-4 p-4">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
        <Users className="w-6 h-6 text-blue-600" />
      </div>
      <div className="flex flex-col items-start w-full ">
        <p className="text-sm text-muted-foreground">Подписчиков</p>
        <p className="text-2xl font-bold">{followers}</p>
      </div>
    </CardContent>
  )
}

export const ProfilePageFollowers = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileResource.statusesAtom).isPending) {
    return <Skeleton className="w-full h-24 md:w-[calc(33.33%-1rem)]" />
  }

  const followers = 1

  return (
    followers >= 1 ? (
      <Dialog>
        <DialogTrigger className="cursor-pointer w-full md:w-[calc(33.33%-1rem)]">
          <Card className="w-full">
            <FollowersDisplayCard followers={followers} />
          </Card>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col w-full h-full overflow-y-auto gap-4">
            <p className="font-semibold text-lg">Подписчики</p>
            <FollowersList />
          </div>
        </DialogContent>
      </Dialog>
    ) : (
      <Card className="w-full md:w-[calc(33.33%-1rem)]">
        <FollowersDisplayCard followers={followers} />
      </Card>
    )
  )
}, "ProfilePageFollowers")