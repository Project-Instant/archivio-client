import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"
import { reatomComponent } from "@reatom/npm-react"
import { homefeedResource } from "../models/homefeed.model"
import { Loader } from "@/shared/ui/loader"

const HomefeedContentSkeleton = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] w-full">
      <Loader />
    </div>
  )
}

const HomefeedContent = reatomComponent(({ ctx }) => {
  if (ctx.spy(homefeedResource.statusesAtom).isPending) {
    return <HomefeedContentSkeleton/>
  }

  const data = ctx.spy(homefeedResource.dataAtom);

  if (!data) return null;

  return (
    <MasonryGrid>
      {data.map(pin => (
        <PinCard key={pin.id} {...pin} />
      ))}
    </MasonryGrid>
  )
}, "HomefeedContent")

export default function HomefeedPage() {
  return (
    <ContainerWrapper>
      <h2 className="text-2xl text-center text-foreground font-bold mb-6">
        Для вас
      </h2>
      <HomefeedContent />
    </ContainerWrapper>
  )
}