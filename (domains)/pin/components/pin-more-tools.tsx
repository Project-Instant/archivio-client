import { ActionItem } from "@/shared/components/action-item/action-item"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { MoreHorizontal, Share } from "lucide-react"
import { PinHide } from "./pin-hide"
import { PinReport } from "./pin-report"

const PinShare = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="active:bg-muted-foreground/20 p-2 rounded-full cursor-pointer">
        <Share size={22} className="text-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1 p-2 w-full h-full">
        <span className="text-sforeground text-base font-semibold">
          Общий доступ
        </span>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const PinActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="active:bg-muted-foreground/20 p-2 rounded-full cursor-pointer">
        <MoreHorizontal size={24} className="text-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1 w-full h-full">
        <ActionItem size="mini" className="cursor-pointer">
          <span className="text-base font-semibold">Скачать изображение</span>
        </ActionItem>
        <PinHide />
        <PinReport />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const PinMoreTools = () => {
  return (
    <>
      <PinShare />
      <PinActions/>
    </>
  )
}