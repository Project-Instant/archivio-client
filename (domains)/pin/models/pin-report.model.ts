import { ApiResponse, experimentalClient } from "@/shared/api/api-client";
import { validateString } from "@/shared/lib/helpers/validate-string";
import { action, atom } from "@reatom/core";
import { reatomAsync, reatomResource, sleep, withCache, withComputed, withDataAtom, withReset, withStatusesAtom } from "@reatom/framework";
import { toast } from "sonner";
import * as S from "sury"

const pinReportSchema = S.schema({
  report: S.string.with(S.min, 1).with(S.max, 128),
  description: S.nullable(
    S.string.with(S.min, 2).with(S.max, 256)
  )
})

type ReportReason = {
  name: string;
  title: string;
  description: string
}

export const pinIsReportedAtom = atom(false, "pinIsReportedAtom")
export const pinReportReasonAtom = atom<string | null>(null, "pinReportReasonAtom").pipe(withReset());
export const pinReportDescriptionAtom = atom("", "pinReportDescriptionAtom").pipe(withReset())
export const pinReportStepAtom = atom<number>(1, "pinReportStepAtom").pipe(withReset())
export const pinReportErrorAtom = atom<string | null>(null, "pinReportErrorAtom")

export const pinReportDialogIsOpenAtom = atom(false, "reportDialogIsOpenAtom").pipe(
  withComputed((ctx, state) => {
    if (ctx.get(pinIsReportedAtom) && state) {
      return false;
    }

    if (!state) {
      pinReportReasonAtom.reset(ctx);
      pinReportDescriptionAtom.reset(ctx);
      pinReportStepAtom.reset(ctx)
    }

    return state;
  })
)

async function getReportReasons(signal: AbortSignal) {
  const res = await experimentalClient("pin/report/get-reasons", { throwHttpErrors: false, signal })
  const json = await res.json<ApiResponse<ReportReason[]>>()

  if (!res.ok || !json.isSuccess) {
    return null;
  }

  return json.data;
}

export const reportReasonsResource = reatomResource(async (ctx) => {
  return await ctx.schedule(async () => getReportReasons(ctx.controller.signal))
}).pipe(withStatusesAtom(), withCache(), withDataAtom())

export const nextAction = action((ctx) => {
  if (ctx.get(pinReportStepAtom) === 2) {
    sendReportAction(ctx);
    return;
  }

  pinReportStepAtom(ctx, (state) => state + 1)
})

export const sendReportAction = reatomAsync(async (ctx) => {
  return await ctx.schedule(async () => {
    const parsed = S.safe(() => S.parseOrThrow({
      report: ctx.get(pinReportReasonAtom),
      description: validateString(ctx.get(pinReportDescriptionAtom))
    }, pinReportSchema))

    if (!parsed.success) {
      return pinReportErrorAtom(ctx, parsed.error.message ?? "Что-то пошло не так")
    }

    await sleep(50);

    pinIsReportedAtom(ctx, true);
  })
}, {
  onFulfill: async (ctx) => {
    pinReportDialogIsOpenAtom(ctx, false);

    await sleep(50);

    toast.success("Репорт был создан.")
  }
}).pipe(withStatusesAtom())