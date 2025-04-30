import { ActionItem } from "@/shared/components/action-item/action-item"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export const PinMoreTools = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="active:bg-neutral-500/20 p-2 rounded-full cursor-pointer">
        <MoreHorizontal size={24} className="text-neutral-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1 w-full h-full">
        <ActionItem size="mini" className="cursor-pointer">
          <span className="text-base font-semibold">Скачать изображение</span>
        </ActionItem>
        <ActionItem size="mini" className="cursor-pointer">
          <span className="text-base font-semibold">Скрыть пин</span>
        </ActionItem>
        <ActionItem size="mini" className="cursor-pointer">
          <span className="text-base font-semibold">Пожаловаться</span>
        </ActionItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}