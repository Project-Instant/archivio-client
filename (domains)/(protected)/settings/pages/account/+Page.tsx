import { Button } from "@/shared/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/select";
import { reatomAsync } from "@reatom/async";
import { atom } from "@reatom/core";
import { reatomComponent } from "@reatom/npm-react";
import { PropsWithChildren } from "react";

const newEmailAtom = atom<string | null>(null, "newEmailAtom")
const newPasswordAtom = atom<string | null>(null, "newPasswordAtom")

const confirmDialogIsOpenAtom = atom(false, "confirmDialogIsOpen");

type Gender = "male" | "female" | "other"

const languageAtom = atom<"ru" | "en">("ru", "languageAtom");
const countryAtom = atom<string | null>(null, "countryAtom")
const genderAtom = atom<Gender | null>(null, "genderAtom")

const EditEmail = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(newEmailAtom) ?? ""}
      onChange={e => newEmailAtom(ctx, e.target.value)}
      placeholder="Укажите почту"
      className="min-w-1/3 w-fit"
    />
  )
}, "EditEmail")

const EditPassword = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(newPasswordAtom) ?? ""}
      placeholder=""
      onChange={e => newPasswordAtom(ctx, e.target.value)}
      className="min-w-1/3 w-fit"
    />
  )
})

const deleteAccountAction = reatomAsync(async (ctx) => {
  return await ctx.schedule((ctx) => {
    confirmDialogIsOpenAtom(ctx, false)
  })
})

const ConfirmDialog = reatomComponent<PropsWithChildren>(({ ctx, children }) => {
  return (
    <Dialog open={ctx.spy(confirmDialogIsOpenAtom)} onOpenChange={v => confirmDialogIsOpenAtom(ctx, v)}>
      {children}
    </Dialog>
  )
})

const EditGender = reatomComponent(({ ctx }) => {
  return (
    <RadioGroup
      value={ctx.spy(genderAtom)}
      onValueChange={v => genderAtom(ctx, v as Gender)}
      className="flex items-center gap-2"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem id="r2" value="male" />
        <Label htmlFor="r2">Мужской</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="r1" value="female" />
        <Label htmlFor="r1">Женский</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="r3" value="other" />
        <Label htmlFor="r3">Другой</Label>
      </div>
    </RadioGroup>
  )
}, "EditGender")

const EditLanguage = reatomComponent(({ ctx }) => {
  return (
    <Select value={ctx.spy(languageAtom)} onValueChange={v => languageAtom(ctx, v as "ru" | 'en')}>
      <SelectTrigger>
        Русский
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ru">
          Русский
        </SelectItem>
        <SelectItem value="en">
          Английский
        </SelectItem>
      </SelectContent>
    </Select>
  )
}, "EditLanguage")

const EditCountry = reatomComponent(({ ctx }) => {
  return (
    <Select value={ctx.spy(countryAtom) ?? "test"} onValueChange={v => countryAtom(ctx, v)}>
      <SelectTrigger>
        Выбрать
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="test">
          Test
        </SelectItem>
      </SelectContent>
    </Select>
  )
}, "EditCountry")

const DeleteAccountButton = reatomComponent(({ ctx }) => {
  return (
    <ConfirmDialog>
      <DialogTrigger asChild>
        <Button className="font-semibold text-lg">
          Удалить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className='text-center'>
          Удаление аккаунта
        </DialogTitle>
        <DialogDescription>
          После этого действия, вы безвозвратно потеряете доступ к аккаунту и всему, что с ним связано.
        </DialogDescription>
        <div className="flex items-center gap-2 justify-end w-full">
          <DialogClose asChild>
            <Button variant="secondary">
              Отмена
            </Button>
          </DialogClose>
          <Button onClick={() => deleteAccountAction(ctx)}>
            Удалить
          </Button>
        </div>
      </DialogContent>
    </ConfirmDialog>
  )
}, "DeleteAccountButton")

export default function SettingsAccountPage() {
  return (
    <div className="flex flex-col w-full h-full gap-8">
      <div className="flex flex-col w-full h-full gap-2">
        <h1 className="text-2xl font-bold text-foreground">
          Управление аккаунтом
        </h1>
        <p className="text-lg text-muted-foreground">
          Вы можете изменить персональные данные или тип аккаунта.
        </p>
      </div>
      <div className="flex flex-col gap-2 justify-between w-full">
        <p className="font-semibold text-lg">Ваш аккаунт</p>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col">
            <p className="text-base">Электронная почта</p>
            <EditEmail />
          </div>
          <div className="flex flex-col">
            <p className="text-base">Пароль</p>
            <EditPassword />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-between w-full">
        <p className="font-semibold text-lg">Персональные данные</p>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <p className="text-base">Пол</p>
            <EditGender />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base">Страна/регион</p>
            <EditCountry />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base">Язык</p>
            <EditLanguage />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="font-semibold text-lg">Удаление аккаунта</p>
          <span className="text-muted-foreground">
            Безвозвратное удаление данных и всего, что связано с аккаунтом
          </span>
        </div>
        <DeleteAccountButton />
      </div>
    </div>
  )
}