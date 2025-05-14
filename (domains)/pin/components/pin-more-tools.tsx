import { ActionItem } from "@/shared/components/action-item/action-item"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { MoreHorizontal, Share } from "lucide-react"
import { PinReport } from "./pin-report"
import { hideAction } from "../models/pin-actions.model"
import { reatomComponent } from "@reatom/npm-react"
import { reatomAsync } from "@reatom/async"
import { experimentalClient } from "@/shared/api/api-client"
import { Encoder } from "cbor-x"
import { currentUserAtom } from "@/(domains)/(auth)/models/user.model"

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

const PinHide = reatomComponent(({ ctx }) => {
  return (
    <ActionItem onClick={() => hideAction(ctx)} size="mini" className="cursor-pointer">
      <span className="text-base font-semibold">Скрыть пин</span>
    </ActionItem>
  )
}, "PinHide")

const sendSignalAction = reatomAsync(async (ctx) => {
  if (!ctx.get(currentUserAtom)) return;

  const payload = {
    key: "analytics",
    value: {
      target: "pin",
      initiator: ctx.get(currentUserAtom),
      checked: true
    }
  }

  return await ctx.schedule(() => experimentalClient.post("analytics/send", {
    body: new Encoder().encode(payload),
    headers: { "Content-Type": "application/cbor" },
  }))
})

const PinSendAnalytics = reatomComponent(({ ctx }) => {
  return (
    <ActionItem onClick={() => sendSignalAction(ctx)} size="mini" className="cursor-pointer">
      <span className="text-base font-semibold">Отправить сигнал</span>
    </ActionItem>
  )
}, "PinHide")

const PinActions = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="active:bg-muted-foreground/20 p-2 rounded-full cursor-pointer">
        <MoreHorizontal size={24} className="text-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1 w-full h-full">
        <ActionItem size="mini" className="cursor-pointer">
          <span className="text-base font-semibold">Скачать изображение</span>
        </ActionItem>
        <PinHide />
        <PinReport />
        <PinSendAnalytics />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const PinMoreTools = () => {
  return (
    <>
      <PinShare />
      <PinActions />
    </>
  )
}