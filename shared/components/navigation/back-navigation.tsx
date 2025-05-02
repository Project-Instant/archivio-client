import { ArrowLeft } from "lucide-react"

export const BackNavigation = () => {
  return (
    <ArrowLeft
      size={38}
      className="cursor-pointer text-foreground active:bg-muted-foreground/20 active:scale-[0.96] duration-150 rounded-full p-1"
      onClick={() => window.history.back()}
    />
  )
}