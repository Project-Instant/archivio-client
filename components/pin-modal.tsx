import { X, Heart, MessageCircle, Share2, MoreHorizontal, Download, Link2 } from "lucide-react"
import { Button } from "@/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar"
import { Input } from "@/ui/input"
import { Separator } from "@/ui/separator"
import { Link } from "./Link"

type Pin = {
  id: number
  title: string
  image: string
  user: {
    name: string
    avatar: string
  }
  height: number
}

type PinModalProps = {
  pin?: Pin
  onClose?: () => void
}

const relatedPins = [
  {
    id: 101,
    title: "Similar design inspiration",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 102,
    title: "You might also like this",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 103,
    title: "Related content for you",
    image: "/placeholder.svg?height=120&width=120",
  },
]

const comments = [
  {
    id: 1,
    user: {
      name: "Jessica",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "This is absolutely gorgeous! I'm saving this for my next home renovation project.",
    time: "2 days ago",
  },
  {
    id: 2,
    user: {
      name: "Michael",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Love the color palette here. What paint brand did you use?",
    time: "1 week ago",
  },
]

export const PinModal = ({ pin, onClose }: PinModalProps) => {
  const defaultPin = {
    id: 1,
    title: "Modern living room with minimalist design",
    image: "/placeholder.svg?height=600&width=400",
    user: { name: "Interior Design", avatar: "/placeholder.svg?height=40&width=40" },
    height: 600,
  }

  const currentPin = pin || defaultPin

  return (
    <div className="bg-white rounded-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row shadow-2xl">
      {onClose && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white md:hidden z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <div className="relative flex-1 bg-gray-100 min-h-[300px] md:min-h-[600px]">
        <img src={currentPin.image || "/placeholder.svg"} alt={currentPin.title} className="object-contain" />
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="w-full md:w-[400px] p-6 overflow-y-auto">
        {onClose && (
          <Button
            variant="secondary"
            size="icon"
            className="hidden md:flex absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200">
              <Download className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200">
              <Link2 className="h-5 w-5" />
            </Button>
          </div>
          <Button className="rounded-full bg-rose-600 hover:bg-rose-700 px-4">Save</Button>
        </div>
        <h1 className="text-2xl font-bold mb-4">{currentPin.title}</h1>
        <p className="text-gray-600 mb-6">
          Beautiful interior design inspiration for your home. This modern living room combines comfort with style,
          featuring neutral tones and minimalist furniture.
        </p>
        <div className="flex items-center gap-3 mb-6">
          <Link href="/profile">
            <Avatar className="h-12 w-12 border cursor-pointer">
              <AvatarImage src={currentPin.user.avatar || "/placeholder.svg"} alt={currentPin.user.name} />
              <AvatarFallback>{currentPin.user.name[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href="/profile">
              <h3 className="font-semibold">{currentPin.user.name}</h3>
            </Link>
            <p className="text-sm text-gray-600">1.2M followers</p>
          </div>
          <Button variant="outline" className="ml-auto rounded-full">
            Follow
          </Button>
        </div>
        <Separator className="my-6" />
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-4">Comments</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm">{comment.user.name}</h4>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-sm">{comment.text}</p>
                <div className="flex items-center gap-3 mt-1">
                  <button className="text-xs text-gray-500 hover:text-gray-900">Reply</button>
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900">
                    <Heart className="h-3 w-3" /> 3
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 mt-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="relative flex-1">
              <Input
                placeholder="Add a comment"
                className="pr-10 rounded-full bg-gray-100 border-0 focus:bg-white focus:border-gray-300"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full p-0"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div>
          <h3 className="font-semibold text-lg mb-4">More like this</h3>
          <div className="grid grid-cols-3 gap-2">
            {relatedPins.map((relatedPin) => (
              <div key={relatedPin.id} className="relative rounded-lg overflow-hidden cursor-pointer group">
                <div className="aspect-square relative">
                  <img
                    src={relatedPin.image || "/placeholder.svg"}
                    alt={relatedPin.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    className="rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1 h-auto"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}