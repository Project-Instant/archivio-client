import { Bell, Menu } from "lucide-react"
import { NotificationsMenu } from "./header-notifications"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/shared/ui/sheet"
import { HeaderLogo } from "./header-logo"
import { HeaderLinks } from "./header-links"
import { GlobalSearch, SearchTrigger } from "./header-search"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { HeaderUser } from "./header-user"

const MENUS = [
  {
    name: "notifications",
    trigger: (
      <div className="flex items-center justify-center">
        <Bell size={20} className="text-foreground" />
        <span className="sr-only">Notifications</span>
      </div>
    ),
    children: <NotificationsMenu />
  },
]

export const ProtectedHeader = () => {
  return (
    <>
      <div className="flex items-center justify-between grow">
        <Sheet>
          <SheetTrigger className="flex items-center cursor-pointer">
            <HeaderLogo />
            <Menu size={20} className="text-foreground ml-2" />
          </SheetTrigger>
          <SheetContent side="top" className="rounded-b-xl">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <div className="container mx-auto h-full">
              <HeaderLinks />
            </div>
          </SheetContent>
        </Sheet>
        <GlobalSearch />
      </div>
      <div className="flex items-center gap-4">
        <SearchTrigger />
        {MENUS.map(i => (
          <DropdownMenu key={i.name}>
            <DropdownMenuTrigger
              className="hover:bg-muted-foreground/20 data-[state=open]:bg-muted-foreground/20 cursor-pointer rounded-xl p-2"
            >
              {i.trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
              {i.children}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
        <HeaderUser />
      </div>
    </>
  )
}