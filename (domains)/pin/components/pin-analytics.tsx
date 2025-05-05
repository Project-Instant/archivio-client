import { Skeleton } from "@/shared/ui/skeleton"
import { reatomComponent } from "@reatom/npm-react"
import { pinAnalyticsResource } from "../models/pin-analytics.model"

type AnalyticsItemProps = {
  title: string,
  value: number
}

const AnalyticsItem = ({ title, value }: AnalyticsItemProps) => {
  return (
    <div className="flex flex-col items-center p-2 text-xl text-foreground">
      <p>{title}</p>
      <p className="font-semibold">{value}</p>
    </div>
  )
}

export const PinAnalytics = reatomComponent(({ ctx }) => {
  if (ctx.spy(pinAnalyticsResource.statusesAtom).isPending) {
    return <Skeleton className="h-24 w-full" />
  }

  const analytics = ctx.spy(pinAnalyticsResource.dataAtom)
  if (!analytics) return null;

  return (
    <div className="flex items-center justify-center w-full min-h-16 max-h-24">
      <div className="flex items-center justify-between w-2/3 px-4 py-2 rounded-xl bg-foreground/[0.05]">
        <AnalyticsItem title="Кликов" value={analytics.clicks} />
        <AnalyticsItem title="Показов" value={analytics.views} />
        <AnalyticsItem title="Сохранений" value={analytics.saves} />
      </div>
    </div>
  )
}, "PinAnalytics")