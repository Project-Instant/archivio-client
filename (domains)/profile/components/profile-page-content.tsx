import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { reatomComponent } from "@reatom/npm-react"
import { Bookmark, Grid } from "lucide-react"
import { createdPinsResource, profileCollectionAtom } from "../models/profile.model"
import { Skeleton } from "@/shared/ui/skeleton"
import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { ContentNotFoundTemplate } from "@/shared/components/templates/not-found-template"

const CreatedPinsSkeleton = () => {
  return (
    <MasonryGrid>
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
    </MasonryGrid>
  )
}

const CreatedCollectionsSkeleton = () => {
  return (
    <div className="grid grid-cols-5 auto-rows-auto gap-2 w-full">
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
    </div>
  )
}

const ContentCreatedPins = reatomComponent(({ ctx }) => {
  if (ctx.spy(createdPinsResource.statusesAtom).isPending) {
    return <CreatedPinsSkeleton />
  }

  const content = ctx.spy(createdPinsResource.dataAtom)

  if (!content) return <ContentNotFoundTemplate />

  return (
    <MasonryGrid>
      {content.map(pin => <PinCard key={pin.id} {...pin} />)}
    </MasonryGrid>
  )
}, "ContentCreatedPins")

const ContentCreatedCollections = reatomComponent(({ ctx }) => {
  if (!ctx.spy(profileCollectionAtom)) {
    return <CreatedCollectionsSkeleton />
  }

  return (
    <>
      <ContentNotFoundTemplate />
    </>
  )
}, "ContentCreatedCollections")

export const ProfileContent = () => {
  return (
    <Tabs defaultValue="pins" className="flex justify-center w-full">
      <TabsList className="flex justify-center items-center gap-4 w-full *:cursor-pointer">
        <TabsTrigger value="pins" className="justify-end group gap-2 !w-fit">
          <Grid className="w-6 h-6" />
          <span className="group-data-[state=active]:underline-offset-4 group-data-[state=active]:underline font-semibold text-lg">
            Созданные
          </span>
        </TabsTrigger>
        <TabsTrigger value="saved" className="justify-start group gap-2 !w-fit">
          <Bookmark className="w-6 h-6" />
          <span className="group-data-[state=active]:underline-offset-4 group-data-[state=active]:underline font-semibold text-lg">
            Сохраненные
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pins" className="mt-8">
        <ContentCreatedPins />
      </TabsContent>
      <TabsContent value="saved" className="mt-8">
        <ContentCreatedCollections />
      </TabsContent>
    </Tabs>
  )
}