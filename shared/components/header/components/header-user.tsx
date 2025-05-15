import { reatomComponent } from "@reatom/npm-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { ArrowDown } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Link } from "../../link/link"
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/dialog"
import { getCurrentUser, isAuthAtom } from "@/(domains)/(auth)/models/user.model"
import { authDialogIsOpenAtom } from "@/(domains)/(auth)/models/auth-dialog.model"
import { wrapLink } from "@/shared/lib/helpers/wrap-link"
import { Separator } from "@/shared/ui/separator"
import { ConfirmDialog, confirmDialogIsOpenAtom } from "../../modals/confirm-dialog"
import { logoutAction } from "@/(domains)/(auth)/models/auth.model"
import { Skeleton } from "@/shared/ui/skeleton"

const HeaderLogoutDialog = reatomComponent(({ ctx }) => {
  return (
    <ConfirmDialog name="logout">
      <DialogContent>
        <DialogTitle className="text-center">
          Выход из аккаунта
        </DialogTitle>
        <DialogDescription>Подтверждение действия</DialogDescription>
        <div className="flex items-center gap-2 justity-end w-full">
          <DialogClose asChild>
            <Button variant="secondary">
              Отмена
            </Button>
          </DialogClose>
          <Button onClick={() => logoutAction(ctx)}>
            Выйти
          </Button>
        </div>
      </DialogContent>
    </ConfirmDialog>
  )
}, "HeaderLogoutDialog")

const HeaderUserCard = reatomComponent(({ ctx }) => {
  const currentUser = getCurrentUser(ctx)
  if (!currentUser) return null;
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-foreground text-sm">Сейчас:</span>
      <div className="flex items-center gap-6 p-3 bg-muted-foreground/10 rounded-lg w-full">
        <Avatar className="size-12">
          <AvatarImage src={currentUser.avatarUrl ?? undefined} alt="" />
          <AvatarFallback>{currentUser.login[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="truncate text-base">{currentUser.name ?? currentUser.login}</p>
          <span className="text-sm text-secondary-foreground">Личный аккаунт</span>
        </div>
      </div>
    </div>
  )
}, "HeaderLogoutDialog")

const HeaderAuthorizeButton = reatomComponent(({ ctx }) => {
  return (
    <Button onClick={() => authDialogIsOpenAtom(ctx, true)} className="text-base font-semibold">
      Войти
    </Button>
  )
}, "HeaderAuthorizeButton")

export const HeaderUser = reatomComponent(({ ctx }) => {
  const currentUser = getCurrentUser(ctx)

  if (!currentUser && ctx.spy(isAuthAtom)) {
    return <Skeleton className="h-9 w-24" />
  }

  if (!currentUser) return <HeaderAuthorizeButton />

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={1}>
          <TooltipTrigger>
            <Link href={wrapLink(currentUser.login, "user")}>
              <Avatar>
                <AvatarImage src={currentUser.avatarUrl ?? undefined} alt="" />
                <AvatarFallback>
                  {currentUser.login[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Профиль</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <HeaderLogoutDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="hover:bg-muted-foreground/20 data-[state=open]:bg-muted-foreground/20 group cursor-pointer rounded-xl p-2">
          <ArrowDown
            size={20}
            className="text-foreground group-data-[state=open]:rotate-180 transition-transform duration-300"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="flex flex-col gap-2 p-3" >
          <HeaderUserCard />
          <DropdownMenuItem>
            <Link href="/settings" className="px-4 py-2 w-full">Настройки</Link>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>
            <Link href="/misc/privacy" className="px-4 py-2 w-full">Конфиденциальность</Link>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem
            onSelect={() => confirmDialogIsOpenAtom(ctx, true)}
            className="px-4 py-2 w-full"
          >
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}, "HeaderUser")