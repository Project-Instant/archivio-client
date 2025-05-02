import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { pinResource } from "../models/pin.model"
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

export const PinRecommendations = reatomComponent(({ ctx }) => {
  const isLoading = (
    ctx.spy(pinResource.statusesAtom).isPending || ctx.spy(pinRecommendationsResource.statusesAtom).isPending
  )
  
  if (isLoading) return <PinRecommendationsSkeleton/>

  const data = ctx.spy(pinRecommendationsResource.dataAtom)

  if (!data) return null

  return (
    <MasonryGrid>
      {data.map(pin => (
        <PinCard key={pin.id} {...pin} />
      ))}
    </MasonryGrid>
  )
})