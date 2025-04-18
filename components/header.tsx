import { useState } from "react"
import { ChevronDown, Home, Compass, Plus } from "lucide-react"
import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { CreatePinModal } from "./create-pin-modal"

export const Header = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="font-semibold rounded-full">
            Home
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem>
            <Home className="mr-2 h-4 w-4" />
            Home Feed
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Compass className="mr-2 h-4 w-4" />
            Today
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>For You</DropdownMenuItem>
          <DropdownMenuItem>Following</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="font-medium text-gray-600 rounded-full">
            Explore
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem>Popular</DropdownMenuItem>
          <DropdownMenuItem>Art</DropdownMenuItem>
          <DropdownMenuItem>Home Decor</DropdownMenuItem>
          <DropdownMenuItem>Fashion</DropdownMenuItem>
          <DropdownMenuItem>Food & Drink</DropdownMenuItem>
          <DropdownMenuItem>Travel</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Browse All Categories</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="font-medium text-gray-600 rounded-full">
            Create
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Pin
          </DropdownMenuItem>
          <DropdownMenuItem>Create Board</DropdownMenuItem>
          <DropdownMenuItem>Create Collection</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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