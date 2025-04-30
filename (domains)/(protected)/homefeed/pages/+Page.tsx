import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"

const HOMEFEED_CARDS_PREVIEW = [
  {
    imageUrl: "https://images.unsplash.com/photo-1744619438376-30bfc6c4666c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Santorini Sunset Views",
    location: "Santorini, Greece",
    category: "Scenic",
    saves: "4.2k"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1744479357124-ef43ab9d6a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Tokyo City Lights",
    location: "Tokyo, Japan",
    category: "Urban",
    saves: "3.8k"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1732316128244-b47689811656?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bali Beach Retreat",
    location: "Bali, Indonesia",
    category: "Beach",
    saves: "5.1k"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1743923754513-ce8fb35d4d69?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Swiss Alps Adventure",
    location: "Zermatt, Switzerland",
    category: "Mountains",
    saves: "2.9k"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1732786923075-d5880b9dde86?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Kyoto Temple Tour",
    location: "Kyoto, Japan",
    category: "Cultural",
    saves: "3.3k"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1743482858217-5aef42cfc636?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "New York City Skyline",
    location: "New York, USA",
    category: "Urban",
    saves: "4.7k",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1742943679519-ee406c510232?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Machu Picchu Hike",
    location: "Cusco, Peru",
    category: "Adventure",
    saves: "6.2k"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1741851373559-6879db14fd8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Northern Lights Experience",
    location: "Tromsø, Norway",
    category: "Nature",
    saves: "5.5k",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1740525030760-5a8614c377dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzMHxGem8zenVPSE42d3x8ZW58MHx8fHx8",
    title: "Ullswater Lake",
    location: "Ullswater Lake",
    category: "Nature",
    saves: "1.2k"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1730799582977-d267a2cae529?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
    title: "Lake District National Park, United Kingdom",
    location: "Lake District National Park, United Kingdom",
    category: "Nature",
    saves: "1.7k"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1661783607393-6c4ea8f182da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    title: "Lake District National Park, United Kingdom",
    location: "Lake District National Park, United Kingdom",
    category: "Nature",
    saves: "1.7k"
  },
  {
    imageUrl: "https://plus.unsplash.com/premium_photo-1706625678451-6fa31c287a0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8",
    title: "Lake District National Park, United Kingdom",
    location: "Lake District National Park, United Kingdom",
    category: "Nature",
    saves: "1.7k"
  }
]

export default function HomefeedPage() {
  return (
    <ContainerWrapper>
      <h2 className="text-2xl text-center font-bold mb-6">
        Для вас
      </h2>
      <MasonryGrid>
        {HOMEFEED_CARDS_PREVIEW.map((card, idx) => (
          <PinCard
            key={idx}
            imageUrl={card.imageUrl}
            title={card.title}
            location={card.location}
            category={card.category}
            saves={card.saves}
          />
        ))}
      </MasonryGrid>
    </ContainerWrapper>
  )
}