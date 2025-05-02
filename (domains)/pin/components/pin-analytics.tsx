import { Skeleton } from "@/shared/ui/skeleton"
import { reatomResource, withCache, withDataAtom, withStatusesAtom } from "@reatom/async"
import { reatomComponent } from "@reatom/npm-react"
import { pinResource } from "../models/pin.model"
import { userResource } from "@/(domains)/(auth)/models/user.model"

export const pinAnalyticsResource = reatomResource(async (ctx) => {
  const pinId = ctx.get(pinResource.dataAtom)?.id

  const isOwner = ctx.spy(pinResource.dataAtom)?.owner.login === ctx.spy(userResource.dataAtom)?.login

  if (!pinId || !isOwner) return null

  const data = { clicks: 0, views: 0, saves: 0 }

  return await ctx.schedule(() => data)
}).pipe(withDataAtom(), withStatusesAtom(), withCache())

export const PinAnalytics = reatomComponent(({ ctx }) => {
  if (ctx.spy(pinAnalyticsResource.statusesAtom).isPending) return <Skeleton className="h-24 w-full" />

  const analytics = ctx.spy(pinAnalyticsResource.dataAtom)

  if (!analytics) return null

  return (
    <div className="flex items-center justify-center w-full h-24">
      <div className="flex items-center justify-between w-2/3 px-4 py-2 rounded-xl bg-foreground/[0.05]">
        <div className="flex flex-col items-center p-2 text-xl text-foreground">
          <p>Кликов</p>
          <p className="font-semibold">{analytics.clicks}</p>
        </div>
        <div className="flex flex-col items-center p-2 text-xl text-foreground">
          <p>Показов</p>
          <p className="font-semibold">{analytics.views}</p>
        </div>
        <div className="flex flex-col items-center p-2 text-xl text-foreground">
          <p>Сохранений</p>
          <p className="font-semibold">{analytics.saves}</p>
        </div>
      </div>
    </div>
  )
}, "PinAnalytics")