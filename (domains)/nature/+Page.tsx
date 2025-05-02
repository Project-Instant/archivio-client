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