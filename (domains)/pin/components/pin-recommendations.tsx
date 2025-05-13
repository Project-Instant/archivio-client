import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { reatomComponent } from "@reatom/npm-react"
import { Loader } from "@/shared/ui/loader"
import { pinRecommendationsResource } from "../models/pin-recommedations.model"
import { currentUserAtom } from "@/(domains)/(auth)/models/user.model"

const PinRecommendationsSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Loader />
    </div>
  )
}

export const PinRecommendations = reatomComponent(({ ctx }) => {
  if (!ctx.spy(currentUserAtom)) {
    return (
      <div className="flex items-center justify-center w-full h-full p-2">
        <h2 className="text-2xl font-bold text-center">
          Для просмотра рекомендаций, пожалуйста, войдите в свой аккаунт
        </h2>
      </div>
    )
  }

  if (ctx.spy(pinRecommendationsResource.statusesAtom).isPending) {
    return <PinRecommendationsSkeleton />
  }

  const data = ctx.spy(pinRecommendationsResource.dataAtom)

  if (!data) return null;

  return (
    <MasonryGrid>
      {data.map(pin => <PinCard key={pin.id} {...pin} />)}
    </MasonryGrid>
  )
})