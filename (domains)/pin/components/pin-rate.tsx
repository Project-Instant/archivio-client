import { Button } from "@/shared/ui/button"
import { Heart } from "lucide-react"

export  const PinRate = () => {
  return (
    <Button className="bg-transparent hover:bg-transparent active:scale-[1.1] duration-150 active:bg-muted-foreground/20 rounded-full p-2">
      <Heart size={28} className="text-foreground" />
    </Button>
  )
}