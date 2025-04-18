import { Link } from "@/components/Link"
import { PinGrid } from "@/components/pin-grid"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar"
import { Button } from "@/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { ArrowLeft, Settings, Share2, MoreHorizontal } from "lucide-react"
import { useData } from 'vike-react/useData'
import { Data } from "./+data"

const ProfileContent = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4">
      <Tabs defaultValue="created" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
          <TabsTrigger value="created" className="rounded-full">
            Created
          </TabsTrigger>
          <TabsTrigger value="saved" className="rounded-full">
            Saved
          </TabsTrigger>
          <TabsTrigger value="boards" className="rounded-full">
            Boards
          </TabsTrigger>
        </TabsList>
        <TabsContent value="created">
          <PinGrid />
        </TabsContent>
        <TabsContent value="saved">
          <PinGrid />
        </TabsContent>
        <TabsContent value="boards">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-square bg-gray-100 relative">
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                    <div className="bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=150&width=150"
                        alt="Board preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=150&width=150"
                        alt="Board preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=150&width=150"
                        alt="Board preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=150&width=150"
                        alt="Board preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="font-medium">Home Inspiration</h3>
                  <p className="text-xs text-gray-500">24 pins</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const ProfileHead = () => {
  return (
    <header className="container max-w-5xl mx-auto px-4 pt-6 pb-8">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-1">Jane Doe</h1>
        <p className="text-gray-500 mb-2">@janedoe</p>
        <p className="text-gray-700 mb-4 max-w-md">
          Digital creator and design enthusiast. Sharing inspiration for home, fashion, and lifestyle.
        </p>
        <div className="flex gap-4 mb-6 text-sm">
          <div>
            <span className="font-semibold">1.2k</span> followers
          </div>
          <div>
            <span className="font-semibold">843</span> following
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="rounded-full bg-rose-600 hover:bg-rose-700">Follow</Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export const Page = () => {
  const { id } = useData<Data>()

  return (
    <div className="min-h-screen bg-white">
      <div className="md:hidden p-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <ProfileHead />
      <ProfileContent />
    </div>
  )
}