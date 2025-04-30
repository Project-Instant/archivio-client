import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { pinResource } from "../models/pin.model"
import { reatomComponent } from "@reatom/npm-react"
import { Loader } from "@/shared/ui/loader"

export const PinRecommendations = reatomComponent(({ ctx }) => {
  const isLoading = ctx.spy(pinResource.statusesAtom).isPending

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Loader />
    </div>
  )

  return (
    <MasonryGrid>
      <PinCard
        imageUrl="https://images.unsplash.com/photo-1741851373559-6879db14fd8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Northern Lights Experience"
        location={{
          address: "Tromsø, Norway",
          coords: {
            latitude: 69.648819,
            longitude: 18.951568
          }
        }}
        category="Nature"
        saves="5.5k"
      />
      <PinCard
        imageUrl="https://images.unsplash.com/photo-1744479357124-ef43ab9d6a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Tokyo City Lights"
        location={{
          address: "Tokyo, Japan",
          coords: {
            latitude: 35.6895,
            longitude: 139.6917
          }
        }}
        category="Urban"
        saves="3.8k"
      />
      <PinCard
        imageUrl="https://images.unsplash.com/photo-1732316128244-b47689811656?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Bali Beach Retreat"
        location={{
          address: "Bali, Indonesia",
          coords: {
            latitude: -8.6897,
            longitude: 115.2177
          }
        }}
        category="Beach"
        saves="5.1k"
      />
    </MasonryGrid>
  )
})