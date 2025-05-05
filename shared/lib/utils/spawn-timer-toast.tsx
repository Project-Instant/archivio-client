import { Button } from "@/shared/ui/button"
import { action, Action, Atom, atom, Ctx } from "@reatom/core"
import { sleep, withReset } from "@reatom/framework"
import { reatomComponent } from "@reatom/npm-react"
import { reatomTimer } from "@reatom/timer"
import { toast } from "sonner"

type SpawnToast = {
  name: string,
  message: string,
  cancelAction?: Action<[], void>,
  successAction?: Action<[], void>
}

type RemainsProps = { 
  remains: Atom<number> 
}

const HIDE_DELAY = 150
const SHOW_DELAY = 5 * 1000

const isStoppedAtom = atom(false, "isStoppedAtom").pipe(withReset())

const Remains = reatomComponent<RemainsProps>(({ ctx, remains }) => (
  <div
    className="remains bg-black"
    style={{ '--remains': ctx.spy(remains) + '%' } as any}
  />
), 'Remains')

export const spawnTimerToast = ({
  name, cancelAction, message, successAction
}: SpawnToast) => {
  const timer = reatomTimer({
    name: `_${name}.timer`,
    interval: 10,
    resetProgress: false,
    delayMultiplier: 1,
  })

  const create = action((ctx) => {
    timer.startTimer(ctx, SHOW_DELAY)

    toast.info(message, {
      id: `_${name}_toast`,
      className: "w-full",
      cancel: (
        <Button className="self-end" onClick={() => remove(ctx)} variant="secondary">
          Отменить
        </Button>
      ),
      action: <Remains remains={remains} />,
      position: "top-center",
      duration: SHOW_DELAY,
    });
  })

  const remove = action((ctx) => {
    isStoppedAtom(ctx, true)

    timer.stopTimer(ctx);
  }, `_${name}.remove`)

  const remains = atom((ctx) =>
    (1 - ctx.spy(timer.progressAtom)) * 100,
    `_${name}_remains`
  )

  timer.endTimer.onCall(async (ctx: Ctx) => {
    if (ctx.get(isStoppedAtom) && cancelAction) {
      cancelAction(ctx);
    } else {
      if (successAction) {
        successAction(ctx)
      }
    }

    await sleep(HIDE_DELAY);
    toast.dismiss(`_${name}_toast`);
    isStoppedAtom.reset(ctx)
  })

  return { create, remove, remains, timer }
}