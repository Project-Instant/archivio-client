import { PinCard } from "@/shared/components/pin-card/pin-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { reatomComponent } from "@reatom/npm-react"
import { Bookmark, Grid } from "lucide-react"
import { profileResource } from "../models/profile.model"
import { Skeleton } from "@/shared/ui/skeleton"
import { Pin } from "@/(domains)/pin/models/pin.model"

const SAVED_COLLECTIONS: Pin[] = [
  {
    id: "hex-19asx",
    fullImage: "https://images.unsplash.com/photo-1745276238174-d6ae422eeb78?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Santorini Sunset Views",
    category: "Scenic",
    meta: {
      saves: 4200
    }
  },
  {
    id: "asdzk81",
    fullImage: "https://images.unsplash.com/photo-1744619438376-30bfc6c4666c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Tokyo City Lights",
    category: "Urban",
    meta: {
      saves: 3800
    }
  },
  {
    id: "kzuu18ak",
    fullImage: "https://images.unsplash.com/photo-1744479357124-ef43ab9d6a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bali Beach Retreat",
    category: "Beach",
    meta: {
      saves: 5100
    }
  },
  {
    id: "12ozjaj",
    fullImage: "https://images.unsplash.com/photo-1732316128244-b47689811656?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Swiss Alps Adventure",
    category: "Mountains",
    meta: {
      saves: 2900
    }
  }
]

const ContentCreatedPins = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileResource.statusesAtom).isPending) {
    return (
      <>
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
      </>
    )
  }

  return SAVED_COLLECTIONS.map(collection => (
    <PinCard key={collection.id} {...collection}/>
  ))
})

const CREATED_COLLECTIONS: Pin[] = [
  {
    id: "asdzxczx",
    fullImage:"https://images.unsplash.com/photo-1732786923075-d5880b9dde86?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"New York City Skyline",
    category:"Urban",
    meta: {
      saves: 4700
    }
  },
  {
    id: "1asdas123iozja",
    fullImage:"https://images.unsplash.com/photo-1743923754513-ce8fb35d4d69?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Kyoto Temple Tour",
    category:"Cultural",
    meta: {
      saves: 3300
    }
  },
  {
    id: "123ioasdzzja",
    fullImage:"https://images.unsplash.com/photo-1743482858217-5aef42cfc636?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Machu Picchu Hike",
    category:"Adventure",
    meta: {
      saves: 6200
    }
  },
  {
    id: "123iozja",
    fullImage:"https://images.unsplash.com/photo-1742943679519-ee406c510232?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Northern Lights Experience",
    category:"Nature",
    meta: {
      saves: 5500
    }
  }
]

const ContentCreatedCollections = reatomComponent(({ ctx }) => {
  if (ctx.spy(profileResource.statusesAtom).isPending) {
    return (
      <>
        <Skeleton className="w-1/2 h-full" />
        <Skeleton className="w-1/2 h-full" />
        <Skeleton className="w-3/4 h-1/2" />
        <Skeleton className="w-1/4 h-1/3" />
      </>
    )
  }

  return CREATED_COLLECTIONS.map(collection => (
    <PinCard key={collection.id} {...collection} />
  ))
})

export const ProfilePageContent = () => {
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
      <TabsContent value="pins" className="mt-6">
        <div className="grid grid-cols-4 w-full h-48 gap-2">
          <ContentCreatedPins />
        </div>
      </TabsContent>
      <TabsContent value="saved" className="mt-6">
        <div className="grid grid-cols-4 w-full h-48 gap-2">
          <ContentCreatedCollections />
        </div>
      </TabsContent>
    </Tabs>
  )
}