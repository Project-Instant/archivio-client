import { ActionItem } from "@/shared/components/action-item/action-item"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { MoreHorizontal, Share } from "lucide-react"

export const PinMoreTools = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="active:bg-muted-foreground/20 p-2 rounded-full cursor-pointer">
          <Share size={22} className="text-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1 p-2 w-full h-full">
          <span className="text-sforeground text-base font-semibold">
            Общий доступ
          </span>
          {/*  */}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className="active:bg-muted-foreground/20 p-2 rounded-full cursor-pointer">
          <MoreHorizontal size={24} className="text-foreground" />
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
    </>
  )
}