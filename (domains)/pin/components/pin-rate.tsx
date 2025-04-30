import { Button } from "@/shared/ui/button"
import { Heart } from "lucide-react"

export  const PinRate = () => {
  return (
    <Button className="bg-transparent hover:bg-transparent group active:bg-neutral-500/20 rounded-full p-2">
      <Heart size={28} className="text-neutral-800 group-active:scale-[1.1] duration-150" />
    </Button>
  )
}