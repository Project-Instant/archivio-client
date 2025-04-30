import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"

const NatureContent = () => {
  return (
    <section className="mb-10">
      <div className="relative w-full h-[300px] rounded-2xl overflow-hidden mb-6">
        <img
          src="/placeholder.svg?height=600&width=1200"
          alt="Nature Escapes"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-12">
          <h1 className="text-3xl font-bold text-white mb-4 max-w-md">Breathtaking Natural Wonders</h1>
          <p className="text-white/90 mb-6 max-w-md">
            Explore the most stunning landscapes and natural phenomena around the world
          </p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Nature's Masterpieces</h2>
      <MasonryGrid>
        <PinCard
          imageUrl="/placeholder.svg?height=700&width=400"
          title="Amazon Rainforest"
          location="Brazil"
          category="Rainforest"
          saves="4.5k"
        />
        <PinCard
          imageUrl="/placeholder.svg?height=600&width=400"
          title="Grand Canyon Views"
          location="Arizona, USA"
          category="Canyon"
          saves="5.3k"
        />
        <PinCard
          imageUrl="/placeholder.svg?height=800&width=400"
          title="Icelandic Waterfalls"
          location="Iceland"
          category="Waterfall"
          saves="3.7k"
        />
        <PinCard
          imageUrl="/placeholder.svg?height=650&width=400"
          title="Great Barrier Reef"
          location="Queensland, Australia"
          category="Marine"
          saves="4.1k"
        />
        <PinCard
          imageUrl="/placeholder.svg?height=550&width=400"
          title="Sahara Desert Dunes"
          location="Morocco"
          category="Desert"
          saves="2.8k"
        />
        <PinCard
          imageUrl="/placeholder.svg?height=750&width=400"
          title="Norwegian Fjords"
          location="Norway"
          category="Fjords"
          saves="3.9k"
        />
        <PinCard
          imageUrl="/placeholder.svg?height=600&width=400"
          title="Mount Fuji"
          location="Japan"
          category="Mountain"
          saves="5.6k"
        />
      </MasonryGrid>
    </section>
  )
}

export default function NaturePage() {
  return (
    <ContainerWrapper>
      <NatureContent />
    </ContainerWrapper>
  )
}