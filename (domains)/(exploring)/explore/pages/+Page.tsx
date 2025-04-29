import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper";
import { Button } from "@/shared/ui/button";

export default function ExplorePage() {
  return (
    <ContainerWrapper>
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
            <a href="/explore">
              <Button className="w-fit bg-emerald-600 hover:bg-emerald-700">
                Start exploring
              </Button>
            </a>
          </div>
        </div>
      </section>
    </ContainerWrapper>
  )
}