import { reatomComponent, useAction } from "@reatom/npm-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { ArrowDown } from "lucide-react"
import { ActionItem } from "../../action-item/action-item"
import { Button } from "@/shared/ui/button"
import { Link } from "../../link/Link"
import { Skeleton } from "@/shared/ui/skeleton"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/shared/ui/dialog"
import { logoutAction, userResource } from "@/(domains)/(auth)/models/user.model"
import { openAuthDialogAction } from "@/(domains)/(auth)/models/auth-dialog.model"
import { wrapLink } from "@/shared/lib/wrap-link"
import { Separator } from "@/shared/ui/separator"

const Logout = () => {
  const logout = useAction(logoutAction)

  return (
    <>
      <DialogTrigger>
        <ActionItem size="mini" className="cursor-pointer">
          Выйти
        </ActionItem>
      </DialogTrigger>
      <DialogContent>
        <p>Точно хотите выйти?</p>
        <DialogClose asChild>
          <button onClick={logout}>да</button>
        </DialogClose>
        <DialogClose asChild>
          <button>
            нет
          </button>
        </DialogClose>
      </DialogContent>
    </>
  )
}

const HeaderUserMenu = reatomComponent(({ ctx }) => {
  const user = ctx.spy(userResource.dataAtom)

  if (!user) return null;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-muted-foreground/20 data-[state=open]:bg-muted-foreground/20 group cursor-pointer rounded-xl p-2">
          <ArrowDown
            size={20}
            className="text-foreground group-data-[state=open]:rotate-180 duration-300"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="flex flex-col gap-2 p-3" >
          <div className="flex flex-col gap-2 w-full">
            <span className="text-foreground text-sm">Сейчас:</span>
            <div className="flex items-center gap-6 p-3 bg-muted-foreground/10 rounded-lg w-full">
              <Avatar className="size-12">
                <AvatarImage src={user.avatarUrl ?? undefined} alt="" />
                <AvatarFallback>{user.name.split(' ')[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="truncate">{user.name}</p>
                <span className="text-secondary-foreground">Личный аккаунт</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <DropdownMenuItem>
              <Link href="/settings" className="px-4 py-2 w-full">
                Настройки
              </Link>
            </DropdownMenuItem>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 w-full">
            <DropdownMenuItem>
              <Link href="/misc/privacy" className="px-4 py-2 w-full">
                Конфиденциальность
              </Link>
            </DropdownMenuItem>
          </div>
          <Separator />
          <Logout />
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}, "HeaderUserMenu")

const HeaderUserLink = reatomComponent(({ ctx }) => {
  const user = ctx.spy(userResource.dataAtom)

  if (!user) return null;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={1}>
        <TooltipTrigger>
          <Link href={wrapLink(user.login, "user")}>
            <Avatar>
              <AvatarImage src={user.avatarUrl ?? undefined} alt="" />
              <AvatarFallback>{user.name.split(' ')[0]}</AvatarFallback>
            </Avatar>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <span>Профиль</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}, "HeaderUserLink")

export const HeaderUser = reatomComponent(({ ctx }) => {
  const openAuthDialog = useAction(openAuthDialogAction)

  return (
    <div className='flex items-center gap-2'>
      {ctx.spy(userResource.statusesAtom).isPending ? (
        <Skeleton className="h-12 w-48" />
      ) : (
        <>
          {ctx.spy(userResource.dataAtom) ? (
            <>
              <HeaderUserLink />
              <HeaderUserMenu />
            </>
          ) : (
            <>
              <Button
                onClick={() => openAuthDialog(true)}
                className="cursor-pointer hover:bg-red-700 bg-red-600 text-white text-lg font-semibold"
              >
                Войти
              </Button>
            </>
          )}
        </>
      )}
    </div>
  )
}, "HeaderUser")