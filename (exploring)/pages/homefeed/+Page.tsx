import { MasonryGrid } from "@/shared/components/grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { Button } from "@/shared/ui/button"

export default function HomefeedPage() {
  return (
    <section className="mb-10">
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-6">
        <img
          src="https://images.unsplash.com/photo-1745276238174-d6ae422eeb78?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Discover amazing destinations"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-12">
          <h1 className="text-4xl font-bold text-white mb-4 max-w-md">Discover your next adventure</h1>
          <p className="text-white/90 mb-6 max-w-md">
            Explore breathtaking destinations and create your travel bucket list
          </p>
          <Button className="w-fit bg-emerald-600 hover:bg-emerald-700">Start exploring</Button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
      <MasonryGrid>
        <PinCard
          imageUrl="https://images.unsplash.com/photo-1744619438376-30bfc6c4666c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Santorini Sunset Views"
          location="Santorini, Greece"
          category="Scenic"
          saves="4.2k"
        />
        <PinCard
          imageUrl="https://images.unsplash.com/photo-1744479357124-ef43ab9d6a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Tokyo City Lights"
          location="Tokyo, Japan"
          category="Urban"
          saves="3.8k"
        />
        <PinCard
          imageUrl="https://images.unsplash.com/photo-1732316128244-b47689811656?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Bali Beach Retreat"
          location="Bali, Indonesia"
          category="Beach"
          saves="5.1k"
        />
        <PinCard
          imageUrl="https://images.unsplash.com/photo-1743923754513-ce8fb35d4d69?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Swiss Alps Adventure"
          location="Zermatt, Switzerland"
          category="Mountains"
          saves="2.9k"
        />
        <PinCard
          imageUrl="https://images.unsplash.com/photo-1732786923075-d5880b9dde86?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Kyoto Temple Tour"
          location="Kyoto, Japan"
          category="Cultural"
          saves="3.3k"
        />
        <PinCard
          imageUrl="https://images.unsplash.com/photo-1743482858217-5aef42cfc636?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="New York City Skyline"
          location="New York, USA"
          category="Urban"
          saves="4.7k"
        />
        <PinCard
          imageUrl="https://images.unsplash.com/photo-1742943679519-ee406c510232?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Machu Picchu Hike"
          location="Cusco, Peru"
          category="Adventure"
          saves="6.2k"
        />
        <PinCard
          imageUrl="https://images.unsplash.com/photo-1741851373559-6879db14fd8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Northern Lights Experience"
          location="Tromsø, Norway"
          category="Nature"
          saves="5.5k"
        />
      </MasonryGrid>
    </section>
  )
}