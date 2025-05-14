import { currentUserAtom } from "@/(domains)/(auth)/models/user.model";
import { spawnTimerToast } from "@/shared/lib/utils/spawn-timer-toast";
import { action, atom } from "@reatom/core";

export const pinIsHiddenAtom = atom(false, "pinIsHiddenAtom")

export const cancelAction = action((ctx) => {
  console.log("toast after cancel action")
  pinIsHiddenAtom(ctx, false)
})

const successAction = action((_) => {
  console.log("toast after success action", )
  // 
})

export const hideAction = action((ctx) => {
  if (!ctx.get(currentUserAtom)) return;

  pinIsHiddenAtom(ctx, true);

  spawnTimerToast({ 
    name: "pin_hide", 
    cancelAction: cancelAction,
    successAction: successAction, 
    message: "Пин скрыт",
    buttonMessage: "Отменить"
  }).create(ctx)
})