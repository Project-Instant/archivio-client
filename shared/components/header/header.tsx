import { Bell, Menu, Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { HeaderUser } from "./header-user";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { HeaderLinks } from "./header-links";
import { AuthDialog } from "../../../(auth)/components/auth-dialog/auth-dialog";
import { reatomComponent, useAction } from "@reatom/npm-react";
import { userAtom } from "../../../(auth)/domain/user/user.model";
import { changeThemeAction, themeAtom } from "../theme/theme.model";
import { Switch } from "@/shared/ui/switch";

const NotificationsMenu = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
      <p className="text-md font-semibold text-neutral-900">Обновления</p>
      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
        <span className="text-neutral-900 text-sm">пусто</span>
      </div>
    </div>
  )
}

const MENUS = [
  {
    name: "notifications",
    trigger: (
      <div className="flex items-center justify-center">
        <Bell size={20} />
        <span className="sr-only">Notifications</span>
      </div>
    ),
    children: <NotificationsMenu />
  },
]

const HeaderMenus = () => {
  return (
    MENUS.map(i => (
      <DropdownMenu key={i.name}>
        <DropdownMenuTrigger className="hover:bg-neutral-800/20 data-[state=open]:bg-neutral-800/20 group cursor-pointer rounded-xl p-2">
          {i.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          {i.children}
        </DropdownMenuContent>
      </DropdownMenu>
    ))
  )
}

const ThemeSwitcher = reatomComponent(({ ctx }) => {
  const toggleTheme = useAction(changeThemeAction);

  return (
    <Switch
      checked={ctx.spy(themeAtom) === "dark"}
      value={ctx.spy(themeAtom)}
      onClick={toggleTheme}
    />
  )
})

export const Header = reatomComponent(({ ctx }) => {
  return (
    <header className="sticky bg-background top-0 z-10">
      {!ctx.spy(userAtom) && <AuthDialog />}
      <div className="container flex items-center h-16 mx-auto gap-x-4">
        <div className="grow">
          <Sheet>
            <SheetTrigger className="flex items-center hover:bg-neutral-900/20 cursor-pointer rounded-xl px-2">
              <img src="/logo_no_bg.png" width={48} height={48} alt="" />
              <span className="font-bold text-neutral-900 text-lg">
                Archivio
              </span>
              <Menu size={20} className="text-neutral-900 ml-2" />
            </SheetTrigger>
            <SheetContent side="top" className="rounded-b-xl">
              <HeaderLinks />
            </SheetContent>
          </Sheet>
        </div>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск"
            className="pl-10 bg-gray-100 border-none rounded-full focus-visible:ring-gray-300"
          />
        </div>
        <ThemeSwitcher />
        <div className="flex items-center gap-4">
          <HeaderMenus />
          <HeaderUser />
        </div>
      </div>
    </header>
  )
}, "Header")