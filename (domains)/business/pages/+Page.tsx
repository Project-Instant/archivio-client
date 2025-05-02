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

export default function BusinessPage() {
  return (
    <ContainerWrapper>
      <BusinessContentPreview />
      <h2 className="text-2xl font-bold mb-6">Top Business Destinations</h2>

    </ContainerWrapper>
  )
}