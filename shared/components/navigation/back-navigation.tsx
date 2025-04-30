import { ArrowLeft } from "lucide-react"

export const BackNavigation = () => {
  return (
    <ArrowLeft
      size={38}
      className="cursor-pointer active:bg-neutral-500/20 active:scale-[0.96] duration-150 rounded-full p-1"
      onClick={() => window.history.back()}
    />
  )
}