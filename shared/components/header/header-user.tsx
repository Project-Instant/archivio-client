import { reatomComponent, useAction } from "@reatom/npm-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { ArrowDown } from "lucide-react"
import { ActionItem } from "../action-item/action-item"
import { Button } from "@/shared/ui/button"
import { Link } from "../link/Link"
import { Skeleton } from "@/shared/ui/skeleton"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/shared/ui/dialog"
import { logoutAction, userResource } from "@/(domains)/(auth)/models/user.model"
import { openAuthDialogAction } from "@/(domains)/(auth)/models/auth-dialog.model"

const Logout = () => {
  const logout = useAction(logoutAction)

  return (
    <Dialog>
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
    </Dialog>
  )
}

const HeaderUserMenu = reatomComponent(({ ctx }) => {
  const user = ctx.spy(userResource.dataAtom)

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-neutral-800/20 data-[state=open]:bg-neutral-800/20 group cursor-pointer rounded-xl p-2">
        <ArrowDown
          size={20}
          className="text-neutral-700 group-data-[state=open]:rotate-180 duration-300"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        className="flex flex-col gap-4 p-2"
      >
        <div className="flex flex-col gap-2 w-full">
          <span className="text-neutral-600 text-sm">
            Сейчас:
          </span>
          <div className="flex items-center gap-2 p-2 bg-neutral-800/10 rounded-lg w-full">
            <Avatar className="size-12">
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
              <AvatarFallback>{user.name.split(' ')[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>{user.name}</p>
              <span className="text-neutral-600">Личный аккаунт</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Link href="/settings">
            <ActionItem size="mini">
              Настройки
            </ActionItem>
          </Link>
        </div>
        <span className="text-neutral-600 text-sm">
          Конфиденциальность:
        </span>
        <div className="flex flex-col gap-2 w-full">
          <Link href="/privacy">
            <ActionItem size="mini">
              Политика конфиденциальности
            </ActionItem>
          </Link>
        </div>
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}, "HeaderUserMenu")

const HeaderUserLink = reatomComponent(({ ctx }) => {
  const user = ctx.spy(userResource.dataAtom)

  if (!user) return null;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={1}>
        <TooltipTrigger>
          <Link href={`/u/${user.login}`}>
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
                className="cursor-pointer hover:bg-red-700 bg-red-600 text-neutral-50 text-lg font-semibold"
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