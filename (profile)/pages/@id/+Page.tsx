import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Edit, Grid, Bookmark, MapPin, Users, Eye } from "lucide-react"
import { MasonryGrid } from "@/shared/components/grid/masonry-grid"
import { PinCard } from "@/shared/components/pin-card/pin-card"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { reatomComponent, useUpdate } from '@reatom/npm-react'
import { Skeleton } from "@/shared/ui/skeleton"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/shared/ui/dialog"
import { useData } from "vike-react/useData"
import { Data } from "./+data"
import { paramAtom, profileResource } from "@/(profile)/domain/profile/profile.model"

const ProfilePageInfoSkeleton = () => {
  return (
    <>
      <Skeleton className="relative w-full h-48 overflow-hidden rounded-xl" />
      <div className="absolute flex items-end gap-4 -bottom-6 left-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-16 w-64" />
      </div>
    </>
  )
}

const ProfilePageInfo = reatomComponent(({ ctx }) => {
  const isLoading = Boolean(
    ctx.spy(profileResource.pendingAtom) || ctx.spy(profileResource.retriesAtom)
  )

  if (isLoading) return <ProfilePageInfoSkeleton />

  const profile = ctx.spy(profileResource.dataAtom)

  if (!profile) return null;

  return (
    <>
      <div className="flex relative items-center w-full py-2 gap-4">
        <Dialog>
          <DialogTrigger className="group">
            <Avatar className="min-w-16 min-h-16 w-fit h-fit max-w-36 max-h-36 border-4 border-white">
              {profile.user.avatarUrl && <AvatarImage src={profile.user.avatarUrl} alt="" />}
              <div className="group-hover:opacity-100 flex opacity-0 absolute duration-150 bg-black/40 cursor-pointer w-full h-full items-center justify-center">
                <Eye size={20} className="text-neutral-50" />
              </div>
              <AvatarFallback className="text-2xl text-neutral-400">
                {profile.user.name.split(" ").map(w => w[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent withClose={false} className="flex flex-col gap-4 bg-transparent p-12 border-none w-fit shadow-none">
            <Avatar className="min-w-48 min-h-48 w-fit h-fit max-w-96 max-h-96 rounded-md">
              {profile.user.avatarUrl && <AvatarImage src={profile.user.avatarUrl} alt="" />}
              <AvatarFallback className="text-2xl text-neutral-400">
                {profile.user.name.split(" ").map(w => w[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <DialogClose className="flex items-center cursor-pointer justify-center h-12 w-full rounded-lg bg-white px-4 py-2">
              <p className="text-neutral-900 font-semibold">Закрыть</p>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <div className="flex flex-col">
          <h1 className="text-2xl truncate font-bold text-neutral-900">
            {profile.user.name}
          </h1>
          <p className="cursor-pointer text-neutral-500 truncate font-medium">
            @{profile.user.login}
          </p>
          <a href="/settings/edit-profile" className="mt-4">
            <Button className="cursor-pointer bg-emerald-600 gap-2 hover:bg-emerald-700 bottom-6 right-6">
              <Edit size={20} />
              <span className="font-semibold text-neutral-50">
                Изменить профиль
              </span>
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}, "ProfilePageInfo")

const ProfilePageNavigation = reatomComponent(({ ctx }) => {
  const about = ctx.spy(profileResource.dataAtom)?.user.about
  const followers = ctx.spy(profileResource.dataAtom)?.followers
  const collection = ctx.spy(profileResource.dataAtom)?.collection
  const history = ctx.spy(profileResource.dataAtom)?.history
  const tags = ctx.spy(profileResource.dataAtom)?.tags

  if (!history || !collection) return null;

  return (
    <div className="mt-12 mb-8">
      <div className="flex flex-wrap gap-6 mb-6">
        <Card className="w-full md:w-[calc(33.33%-1rem)]">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Посещено</p>
              <p className="text-2xl font-bold">{history.destinations}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[calc(33.33%-1rem)]">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full">
              <Bookmark className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Сохранено</p>
              <p className="text-2xl font-bold">{history.saved}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[calc(33.33%-1rem)]">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Подписчиков</p>
              <p className="text-2xl font-bold">{followers}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">О себе</h2>
        <p className="text-muted-foreground">
          {about}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {tags?.map((tag, idx) => (
          <Badge key={idx} variant="secondary">{tag}</Badge>
        ))}
      </div>
    </div>
  )
}, "ProfilePageNavigation")

const ProfilePageContent = () => {
  return (
    <Tabs defaultValue="pins">
      <TabsList className="flex gap-4 w-full rounded-none h-14 bg-transparent justify-start">
        <TabsTrigger
          value="pins"
          className="data-[state=active]:border-b-4 cursor-pointer data-[state=active]:border-emerald-600 rounded-xl h-14 px-6"
        >
          <Grid className="w-4 h-4 mr-2" />
          Мои пины
        </TabsTrigger>
        <TabsTrigger
          value="saved"
          className="data-[state=active]:border-b-4 cursor-pointer data-[state=active]:border-emerald-600 rounded-xl h-14 px-6"
        >
          <Bookmark className="w-4 h-4 mr-2" />
          Сохраненное
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pins" className="mt-6">
        <MasonryGrid>
          <PinCard
            imageUrl="https://images.unsplash.com/photo-1745276238174-d6ae422eeb78?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Santorini Sunset Views"
            location="Santorini, Greece"
            category="Scenic"
            saves="4.2k"
          />
          <PinCard
            imageUrl="https://images.unsplash.com/photo-1744619438376-30bfc6c4666c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Tokyo City Lights"
            location="Tokyo, Japan"
            category="Urban"
            saves="3.8k"
          />
          <PinCard
            imageUrl="https://images.unsplash.com/photo-1744479357124-ef43ab9d6a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Bali Beach Retreat"
            location="Bali, Indonesia"
            category="Beach"
            saves="5.1k"
          />
          <PinCard
            imageUrl="https://images.unsplash.com/photo-1732316128244-b47689811656?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Swiss Alps Adventure"
            location="Zermatt, Switzerland"
            category="Mountains"
            saves="2.9k"
          />
        </MasonryGrid>
      </TabsContent>
      <TabsContent value="saved" className="mt-6">
        <MasonryGrid>
          <PinCard
            imageUrl="https://images.unsplash.com/photo-1743923754513-ce8fb35d4d69?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Kyoto Temple Tour"
            location="Kyoto, Japan"
            category="Cultural"
            saves="3.3k"
          />
          <PinCard
            imageUrl="https://images.unsplash.com/photo-1732786923075-d5880b9dde86?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="New York City Skyline"
            location="New York, USA"
            category="Urban"
            saves="4.7k"
          />
          <PinCard
            imageUrl="https://images.unsplash.com/photo-1743482858217-5aef42cfc636?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Machu Picchu Hike"
            location="Cusco, Peru"
            category="Adventure"
            saves="6.2k"
          />
          <PinCard
            imageUrl="https://images.unsplash.com/photo-1742943679519-ee406c510232?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Northern Lights Experience"
            location="Tromsø, Norway"
            category="Nature"
            saves="5.5k"
          />
        </MasonryGrid>
      </TabsContent>
    </Tabs>
  )
}

const Sync = () => useUpdate(paramAtom, [useData<Data>().id])

export default function ProfilePage() {
  return (
    <>
      <Sync />
      <div className="flex w-full h-56 relative mb-8">
        <ProfilePageInfo />
      </div>
      <ProfilePageNavigation />
      <ProfilePageContent />
    </>
  )
}