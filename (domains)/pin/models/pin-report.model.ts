import { validateString } from "@/shared/lib/helpers/validate-string";
import { action, atom } from "@reatom/core";
import { reatomAsync, sleep, withComputed, withReset, withStatusesAtom } from "@reatom/framework";
import { toast } from "sonner";
import * as S from "sury"

export type ReportReason = typeof REPORT_REASONS[number]["name"]

export const REPORT_REASONS = [
  {
    name: "spam",
    title: "Спам",
    description: "Вводящие в заблуждение или повторяющиеся публикации"
  },
  {
    name: "sexual",
    title: "Изображения обнаженного тела, порнография или содержимое сексуального характера",
    description: `
      Содержимое сексуального характера с участием взрослых или изображением обнаженного тела, 
      материалами в стиле нон-нюд либо с участием несовершеннолетних или со сценами умышленного злоупотребления ими.`
  },
  {
    name: "self-mutilation",
    title: "Членовредительство",
    description: "Расстройства пищевого поведения, нанесение травм себе, суицид"
  },
  {
    name: "false-information",
    title: "Ложная информация",
    description: "Ложная информация о здоровье, климате, голосованиях или теории заговора"
  },
  {
    name: "aggressive",
    title: "Агрессивные действия",
    description: "Предрассудки, стереотипы, идея превосходства белой расы, оскорбления"
  },
  {
    name: "dangerous-goods",
    title: "Опасные товары",
    description: "Наркотики, оружие, регулируемые товары"
  },
  {
    name: "harassment",
    title: "Преследование или критика",
    description: "Оскорбления, угрозы, кибербуллинг, изображения обнаженного тела, опубликованные без разрешения"
  },
  {
    name: "violence",
    title: "Сцены насилия",
    description: "Графическое изображение или пропаганда насилия"
  },
  {
    name: "confidentiality",
    title: "Нарушение конфиденциальности",
    description: "Личные фотографии, персональная информация"
  },
  {
    name: "intellectual-property",
    title: "Это моя интеллектуальная собственность",
    description: "Нарушение авторских прав или прав на товарный знак"
  }
] as const;

const pinReportSchema = S.schema({
  report: S.string.with(S.min, 1).with(S.max, 128),
  description: S.nullable(
    S.string.with(S.min, 2).with(S.max, 256)
  )
})

export const pinIsReportedAtom = atom(false, "pinIsReportedAtom")
export const pinReportReasonAtom = atom<ReportReason | null>(null, "pinReportReasonAtom").pipe(withReset());
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

    console.log(parsed)

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

    toast.success("Репорт был создан.", {
      position: "top-center"
    })
  }
}).pipe(withStatusesAtom())