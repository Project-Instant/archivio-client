import { MapPin, Heart, Bookmark, Share2 } from "lucide-react"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"

type PinCardProps = {
  imageUrl: string
  title: string
  location: string
  category: string
  saves: string
}

export function PinCard({
  imageUrl, title, location, category, saves
}: PinCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="relative group mb-4 overflow-hidden transition-all duration-200 group"
        >
          <div className="relative w-full overflow-hidden cursor-pointer aspect-auto">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              width={400}
              height={600}
              className={`w-full object-cover transition-transform rounded-xl`}
            />
            <div
              className={`absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-100 opacity-0`}
            >
              <div className="absolute flex flex-col items-start justify-between p-4 inset-0">
                <Badge variant="secondary" className="bg-white/90 hover:bg-white">
                  {category}
                </Badge>
                <div className="w-full">
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="flex items-center gap-1 px-2 py-1 text-sm text-white bg-black/50 rounded-full">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{location}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 text-sm text-white bg-black/50 rounded-full">
                      <Bookmark className="w-3 h-3" />
                      <span className="text-xs">{saves}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <Button size="sm" variant="secondary" className="w-full bg-white/90 hover:bg-white">
                      <Heart className="w-4 h-4 mr-1 text-emerald-500" />
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="mt-2 text-sm font-medium line-clamp-1">{title}</h3>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative w-full h-full min-h-[300px]">
            <img src={imageUrl || "/placeholder.svg"} alt={title} className="object-cover" />
          </div>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
              <DialogDescription className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {location}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Travel Explorer</p>
                    <p className="text-xs text-muted-foreground">1.2k followers</p>
                  </div>
                </div>
                <Button variant="outline">Follow</Button>
              </div>
              <div className="space-y-4">
                <Badge variant="outline">{category}</Badge>
                <p className="text-muted-foreground">
                  Experience the breathtaking beauty of {title}. This stunning destination offers unforgettable views
                  and unique experiences for every traveler.
                </p>
                <h4 className="font-medium">Best time to visit</h4>
                <p className="text-sm text-muted-foreground">
                  April to October offers the best weather conditions for exploring this magnificent destination.
                </p>
                <h4 className="font-medium">Travel tips</h4>
                <ul className="pl-5 text-sm list-disc text-muted-foreground">
                  <li>Book accommodations at least 3 months in advance</li>
                  <li>Consider hiring a local guide for the best experience</li>
                  <li>Don't miss the sunrise views from the eastern viewpoint</li>
                  <li>Try the local cuisine at traditional restaurants</li>
                </ul>
              </div>
              <div className="flex gap-2 mt-6">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}