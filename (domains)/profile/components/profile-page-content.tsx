import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { reatomComponent } from "@reatom/npm-react"
import { Bookmark, Grid } from "lucide-react"
import { createdPinsResource, getProfile, profileIsLoadingAtom } from "../models/profile.model"
import { Skeleton } from "@/shared/ui/skeleton"
import { MasonryGrid } from "@/shared/components/masonry-grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { FullscreenNotFound } from "@/shared/components/templates/not-found-template"
import { Loader } from "@/shared/ui/loader"

const ContentCreatedSkeleton = () => {
  return (
    <MasonryGrid>
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
    </MasonryGrid>
  )
}

const ContentCreatedPins = reatomComponent(({ ctx }) => {
  if (ctx.spy(createdPinsResource.statusesAtom).isPending) {
    return <ContentCreatedSkeleton />
  }

  const content = ctx.spy(createdPinsResource.dataAtom)
  if (!content) return <FullscreenNotFound />

  return (
    <MasonryGrid>
      {content.map(pin => <PinCard key={pin.id} {...pin} />)}
    </MasonryGrid>
  )
}, "ContentCreatedPins")

const ContentCreatedCollections = reatomComponent(({ ctx }) => {
  const profileCollection = getProfile.collection(ctx)?.pins

  if (!profileCollection) return <FullscreenNotFound />

  return (
    <>
      <FullscreenNotFound />
    </>
  )
}, "ContentCreatedCollections")

const ProfileContentSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-start min-h-[50vh] mt-4 w-full">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-x-4 gap-y-2 w-full min-h-[50vh] mt-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    </div>
  )
}

export const ProfileContent = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileIsLoadingAtom)) return <ProfileContentSkeleton />

  return (
    <Tabs defaultValue="pins" className="flex justify-center items-start min-h-[50vh] mt-4 w-full">
      <TabsList className="flex flex-col sm:flex-row justify-center items-center gap-x-4 gap-y-2 w-full *:cursor-pointer">
        <TabsTrigger value="pins" className="sm:justify-end hover:bg-muted/20 py-4 px-2 sm:hover:bg-transparent group gap-2 w-full sm:!w-fit">
          <Grid className="w-6 h-6" />
          <span className="group-data-[state=active]:underline-offset-4 group-data-[state=active]:underline font-semibold text-lg">
            Созданные
          </span>
        </TabsTrigger>
        <TabsTrigger value="saved" className="sm:justify-start hover:bg-muted/20 py-4 px-2 sm:hover:bg-transparent group gap-2 w-full sm:!w-fit">
          <Bookmark className="w-6 h-6" />
          <span className="group-data-[state=active]:underline-offset-4 group-data-[state=active]:underline font-semibold text-lg">
            Сохраненные
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pins" className="flex items-center justify-center w-full h-full pt-6">
        <ContentCreatedPins />
      </TabsContent>
      <TabsContent value="saved" className="flex items-center justify-center w-full h-full pt-6">
        <ContentCreatedCollections />
      </TabsContent>
    </Tabs>
  )
}, "ProfileContent")