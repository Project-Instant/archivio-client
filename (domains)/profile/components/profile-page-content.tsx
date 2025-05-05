import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { reatomComponent } from "@reatom/npm-react"
import { Bookmark, Grid } from "lucide-react"
import { createdPinsResource, profileResource } from "../models/profile.model"
import { Skeleton } from "@/shared/ui/skeleton"
import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"

const CreatedPinsSkeleton = () => {
  return (
    <MasonryGrid>
      <Skeleton className="w-full h-24" />
      <Skeleton className="w-full h-48" />
      <Skeleton className="w-full h-24" />
      <Skeleton className="w-full h-36" />
    </MasonryGrid>
  )
}

const CreatedCollectionsSkeleton = () => {
  return (
    <>
      <Skeleton className="w-1/2 h-full" />
      <Skeleton className="w-1/2 h-full" />
      <Skeleton className="w-3/4 h-1/2" />
      <Skeleton className="w-1/4 h-1/3" />
    </>
  )
}

const ContentCreatedPins = reatomComponent(({ ctx }) => {
  if (ctx.spy(createdPinsResource.statusesAtom).isPending) {
    return <CreatedPinsSkeleton />
  }

  const content = ctx.spy(createdPinsResource.dataAtom)

  if (!content) return null;

  return (
    <MasonryGrid>
      {content.map(pin => <PinCard key={pin.id} {...pin} />)}
    </MasonryGrid>
  )
})

const ContentCreatedCollections = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileResource.statusesAtom).isPending) {
    return <CreatedCollectionsSkeleton />
  }

  return (
    <>
      <span className="text-foreground text-lg">
        Ничего не нашлось
      </span>
    </>
  )
})

export const ProfilePageContent = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileResource.statusesAtom).isPending) return null;

  return (
    <Tabs defaultValue="pins">
      <TabsList className="flex gap-4 w-full rounded-none h-14 bg-transparent justify-start">
        <TabsTrigger
          value="pins"
          className="data-[state=active]:border-b-4 cursor-pointer data-[state=active]:border-emerald-600 rounded-xl h-14 px-6"
        >
          <Grid className="w-4 h-4 mr-2" />
          <span className="font-semibold text-lg">
            Созданные
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="saved"
          className="data-[state=active]:border-b-4 cursor-pointer data-[state=active]:border-emerald-600 rounded-xl h-14 px-6"
        >
          <Bookmark className="w-4 h-4 mr-2" />
          <span className="font-semibold text-lg">
            Сохраненные
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pins" className="my-6">
        <ContentCreatedPins />
      </TabsContent>
      <TabsContent value="saved" className="my-6">
        <ContentCreatedCollections />
      </TabsContent>
    </Tabs>
  )
}, "ProfilePageContent")