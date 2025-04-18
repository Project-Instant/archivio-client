import { useState, useRef, useEffect } from "react"
import { Share2, MoreHorizontal, Download } from "lucide-react"
import { Button } from "@/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar"
import { PinModal } from "./pin-modal"
import { CreatePinModal } from "./create-pin-modal"

const pins = [
  {
    id: 1,
    title: "Modern living room with minimalist design",
    image: "/placeholder.svg?height=450&width=300",
    user: { name: "Interior Design", avatar: "/placeholder.svg?height=40&width=40" },
    height: 450,
  },
  {
    id: 2,
    title: "Healthy breakfast ideas for busy mornings",
    image: "/placeholder.svg?height=380&width=300",
    user: { name: "Food Inspiration", avatar: "/placeholder.svg?height=40&width=40" },
    height: 380,
  },
  {
    id: 3,
    title: "Summer fashion trends 2023",
    image: "/placeholder.svg?height=500&width=300",
    user: { name: "Fashion Forward", avatar: "/placeholder.svg?height=40&width=40" },
    height: 500,
  },
  {
    id: 4,
    title: "DIY home decor projects",
    image: "/placeholder.svg?height=420&width=300",
    user: { name: "Crafty Ideas", avatar: "/placeholder.svg?height=40&width=40" },
    height: 420,
  },
  {
    id: 5,
    title: "Travel destinations for 2023",
    image: "/placeholder.svg?height=460&width=300",
    user: { name: "Wanderlust", avatar: "/placeholder.svg?height=40&width=40" },
    height: 460,
  },
  {
    id: 6,
    title: "Workspace setup inspiration",
    image: "/placeholder.svg?height=400&width=300",
    user: { name: "Productivity Tips", avatar: "/placeholder.svg?height=40&width=40" },
    height: 400,
  },
  {
    id: 7,
    title: "Plant-based dinner recipes",
    image: "/placeholder.svg?height=480&width=300",
    user: { name: "Vegan Delights", avatar: "/placeholder.svg?height=40&width=40" },
    height: 480,
  },
  {
    id: 8,
    title: "Minimalist tattoo designs",
    image: "/placeholder.svg?height=350&width=300",
    user: { name: "Ink Inspiration", avatar: "/placeholder.svg?height=40&width=40" },
    height: 350,
  },
  {
    id: 9,
    title: "Cozy bedroom ideas",
    image: "/placeholder.svg?height=430&width=300",
    user: { name: "Home Sweet Home", avatar: "/placeholder.svg?height=40&width=40" },
    height: 430,
  },
  {
    id: 10,
    title: "Outdoor adventure photography",
    image: "/placeholder.svg?height=470&width=300",
    user: { name: "Nature Explorer", avatar: "/placeholder.svg?height=40&width=40" },
    height: 470,
  },
  {
    id: 11,
    title: "Creative bullet journal layouts",
    image: "/placeholder.svg?height=410&width=300",
    user: { name: "Planner Addict", avatar: "/placeholder.svg?height=40&width=40" },
    height: 410,
  },
  {
    id: 12,
    title: "Stylish outfit combinations for fall",
    image: "/placeholder.svg?height=440&width=300",
    user: { name: "Style Guide", avatar: "/placeholder.svg?height=40&width=40" },
    height: 440,
  },
]

export function PinGrid() {
  const [selectedPin, setSelectedPin] = useState<number | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [columns, setColumns] = useState(5)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return

      const width = containerRef.current.offsetWidth

      if (width < 640) {
        setColumns(2)
      } else if (width < 768) {
        setColumns(3)
      } else if (width < 1024) {
        setColumns(4)
      } else {
        setColumns(5)
      }
    }

    updateColumns()

    window.addEventListener("resize", updateColumns)
    
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  const columnPins = Array.from({ length: columns }, () => [] as typeof pins)

  pins.forEach((pin, index) => {
    const columnIndex = index % columns
    columnPins[columnIndex].push(pin)
  })

  return (
    <>
      <div ref={containerRef} className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {columnPins.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map((pin) => (
                <div
                  key={pin.id}
                  className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                  onClick={() => setSelectedPin(pin.id)}
                >
                  <div className="relative" style={{ height: `${pin.height * 0.8}px` }}>
                    <img
                      src={pin.image || "/placeholder.svg"}
                      alt={pin.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-end">
                        <Button variant="secondary" className="rounded-full bg-rose-600 hover:bg-rose-700 text-white">
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-sm line-clamp-2">{pin.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={pin.user.avatar || "/placeholder.svg"} alt={pin.user.name} />
                        <AvatarFallback>{pin.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">{pin.user.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-rose-600 hover:bg-rose-700 shadow-lg md:hidden"
        size="icon"
        onClick={() => setShowCreateModal(true)}
      >
        <span className="text-2xl font-bold text-white">+</span>
      </Button>
      {selectedPin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setSelectedPin(null)}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <PinModal pin={pins.find((p) => p.id === selectedPin)!} onClose={() => setSelectedPin(null)} />
          </div>
        </div>
      )}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <CreatePinModal onClose={() => setShowCreateModal(false)} />
          </div>
        </div>
      )}
    </>
  )
}