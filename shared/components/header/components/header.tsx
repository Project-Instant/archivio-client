import { Bell, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { HeaderLinks } from "./header-links";
import { reatomComponent } from "@reatom/npm-react";
import { currentUserAtom } from "@/(domains)/(auth)/models/user.model";
import { AuthDialog } from "@/(domains)/(auth)/components//auth-dialog";
import { GlobalSearch, SearchTrigger } from "./header-search";
import { HeaderUser } from "./header-user";
import { NotificationsMenu } from "./header-notifications";
import { HeaderLogo } from "./header-logo";

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

export const Header = reatomComponent(({ ctx }) => {
  return (
    <>
      {!ctx.spy(currentUserAtom) && <AuthDialog />}
      <header className="sticky bg-background top-0 z-10">
        <div className="container flex items-center h-16 mx-auto gap-x-4">
          <div className="flex items-center justify-between grow">
            <Sheet>
              <SheetTrigger className="flex items-center cursor-pointer">
                <HeaderLogo />
                <Menu size={20} className="text-foreground ml-2" />
              </SheetTrigger>
              <SheetContent side="top" className="rounded-b-xl">
                <HeaderLinks />
              </SheetContent>
            </Sheet>
            <GlobalSearch />
          </div>
          <div className="flex items-center gap-4">
            <SearchTrigger />
            {MENUS.map(i => (
              <DropdownMenu key={i.name}>
                <DropdownMenuTrigger className="hover:bg-muted-foreground/20 data-[state=open]:bg-muted-foreground/20 group cursor-pointer rounded-xl p-2">
                  {i.trigger}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2">
                  {i.children}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <HeaderUser />
          </div>
        </div>
      </header>
    </>
  )
}, "Header")