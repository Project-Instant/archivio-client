import { hideAction } from "../models/pin-actions.model"
import { reatomComponent } from "@reatom/npm-react"
import { ActionItem } from "@/shared/components/action-item/action-item"

export const PinHide = reatomComponent(({ ctx }) => {
  return (
    <ActionItem onClick={() => hideAction(ctx)} size="mini" className="cursor-pointer">
      <span className="text-base font-semibold">Скрыть пин</span>
    </ActionItem>
  )
}, "PinHide")