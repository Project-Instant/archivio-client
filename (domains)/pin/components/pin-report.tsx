import { ActionItem } from "@/shared/components/action-item/action-item";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Textarea } from "@/shared/ui/textarea";
import { reatomComponent } from "@reatom/npm-react";
import { JSX } from "react";
import {
  nextAction,
  pinIsReportedAtom,
  pinReportDescriptionAtom,
  pinReportDialogIsOpenAtom,
  pinReportReasonAtom,
  pinReportStepAtom,
  REPORT_REASONS,
  ReportReason
} from "../models/pin-report.model";

const PinReportDescription = reatomComponent(({ ctx }) => {
  return (
    <>
      <div className="flex w-full">
        <Textarea
          placeholder="Напишите причину жалобы (опционально)"
          value={ctx.spy(pinReportDescriptionAtom)}
          onChange={e => pinReportDescriptionAtom(ctx, e.target.value)}
          maxLength={1024}
        />
      </div>
      <div className="flex items-center gap-4 w-full justify-end">
        <Button onClick={() => pinReportStepAtom(ctx, (state) => state - 1)}>
          Назад
        </Button>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => nextAction(ctx)}
          disabled={!ctx.spy(pinReportReasonAtom)}
        >
          Отправить
        </Button>
      </div>
    </>
  )
}, "PinReportDescription")

const PinReportSelectReason = reatomComponent(({ ctx }) => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full h-full">
        <RadioGroup
          value={ctx.spy(pinReportReasonAtom)}
          onValueChange={v => pinReportReasonAtom(ctx, v as ReportReason)}
          className="w-full"
        >
          {REPORT_REASONS.map(report => (
            <div key={report.name} className="flex p-2 items-start gap-4 w-full">
              <RadioGroupItem
                className="relative top-1.5"
                value={report.name}
                id={report.name}
              />
              <Label htmlFor={report.name} className="text-base">
                {report.title}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex items-center gap-4 w-full justify-end">
        <DialogClose asChild>
          <Button>Отмена</Button>
        </DialogClose>
        <Button
          onClick={() => nextAction(ctx)}
          disabled={!ctx.spy(pinReportReasonAtom)}
        >
          Далее
        </Button>
      </div>
    </>
  )
}, "PinReportSelectReason")

const PIN_STEPS: Record<number, JSX.Element> = {
  1: <PinReportSelectReason />,
  2: <PinReportDescription />
}

export const PinReport = reatomComponent(({ ctx }) => {
  return (
    <Dialog
      open={ctx.spy(pinReportDialogIsOpenAtom)}
      onOpenChange={v => pinReportDialogIsOpenAtom(ctx, v)}
    >
      <ActionItem
        size="mini"
        data-state={!ctx.spy(pinIsReportedAtom) ? "active" : "inactive"}
        onClick={() => pinReportDialogIsOpenAtom(ctx, true)}
        className="cursor-pointer data-[state=inactive]:pointer-events-none data-[state=inactive]:opacity-50"
      >
        <span className="text-base font-semibold">Пожаловаться</span>
      </ActionItem>
      <DialogContent className="flex flex-col gap-4 min-h-48 w-full">
        <p className="text-xl text-center font-semibold">Жалоба на пин</p>
        {PIN_STEPS[ctx.spy(pinReportStepAtom)]}
      </DialogContent>
    </Dialog>
  )
}, "PinReport")