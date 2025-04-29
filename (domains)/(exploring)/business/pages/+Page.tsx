import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"

const BusinessContentPreview = () => {
  return (
    <section id="preview" className="mb-10">
      <div className="relative w-full h-[300px] rounded-2xl overflow-hidden mb-6">
        <img
          src="/placeholder.svg?height=600&width=1200"
          alt="Business Travel"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-12">
          <h1 className="text-3xl font-bold text-white mb-4 max-w-md">Business Travel Simplified</h1>
          <p className="text-white/90 mb-6 max-w-md">
            Discover the best destinations for conferences, meetings, and corporate retreats
          </p>
        </div>
      </div>
    </section>
  )
}

const CARDS_PREVIEW = [
  {
    imageUrl: '/placeholder.svg?height=600&width=400',
    title: 'Singapore Business District',
    location: 'Singapore',
    category: 'Conference',
    saves: '2.8k',
  },
  {
    imageUrl: '/placeholder.svg?height=500&width=400',
    title: 'Dubai Corporate Centers',
    location: 'Dubai, UAE',
    category: 'Business Hub',
    saves: '3.1k',
  },
  {
    imageUrl: '/placeholder.svg?height=700&width=400',
    title: 'London Financial District',
    location: 'London, UK',
    category: 'Finance',
    saves: '2.5k',
  },
  {
    imageUrl: '/placeholder.svg?height=650&width=400',
    title: 'Hong Kong Skyline',
    location: 'Hong Kong',
    category: 'Trade',
    saves: '1.9k',
  },
  {
    imageUrl: '/placeholder.svg?height=550&width=400',
    title: 'New York Wall Street',
    location: 'New York, USA',
    category: 'Finance',
    saves: '3.4k',
  },
  {
    imageUrl: '/placeholder.svg?height=600&width=400',
    title: 'San Francisco Tech Campus',
    location: 'San Francisco, USA',
    category: 'Technology',
    saves: '2.7k',
  }
]

export default function BusinessPage() {
  return (
    <ContainerWrapper>
      <BusinessContentPreview />
      <h2 className="text-2xl font-bold mb-6">Top Business Destinations</h2>
      <MasonryGrid>
        {CARDS_PREVIEW.map((card, idx) => (
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