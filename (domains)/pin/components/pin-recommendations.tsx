import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { reatomComponent } from "@reatom/npm-react"
import { Loader } from "@/shared/ui/loader"
import { pinRecommendationsResource } from "../models/pin-recommedations.model"

const PinRecommendationsSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Loader />
    </div>
  )
}

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h2 className="text-2xl font-bold text-center">
        Для просмотра рекомендаций, пожалуйста, войдите в свой аккаунт
      </h2>
    </div>
  )
}

export const PinRecommendations = reatomComponent(({ ctx }) => {
  const data = ctx.spy(pinRecommendationsResource.dataAtom)

  if (ctx.spy(pinRecommendationsResource.statusesAtom).isPending) {
    return <PinRecommendationsSkeleton />
  }

  if (!data) return null;

  if (!data.data && data.status === 'unauthorized') {
    return <Unauthorized />
  }

  const pins = data.data
  if (!pins) return null;

  return (
    <MasonryGrid>
      {pins.map(pin => <PinCard key={pin.id} {...pin} />)}
    </MasonryGrid>
  )
})