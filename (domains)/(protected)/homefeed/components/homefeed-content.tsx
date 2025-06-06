import { Loader } from "@/shared/ui/loader";
import { reatomComponent } from "@reatom/npm-react";
import { homefeedResource } from "../models/homefeed.model";
import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid";
import { PinCard } from "@/shared/components/pin-card/pin-card";

const HomefeedContentSkeleton = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] w-full">
      <Loader />
    </div>
  )
}

export const HomefeedContent = reatomComponent(({ ctx }) => {
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