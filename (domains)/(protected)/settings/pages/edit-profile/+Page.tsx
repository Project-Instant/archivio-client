import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { reatomComponent } from "@reatom/npm-react"
import { applyChangesAction, isChangesAtom, MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH, newDescriptionAtom, newNameAtom } from "../../models/edit-profile.model"
import { EditAvatar } from "../../components/edit-avatar"

const ApplyChanges = reatomComponent(({ ctx }) => {
  return (
    <Button
      className="bg-emerald-600 hover:bg-emerald-700 w-fit px-4 text-lg font-semibold text-white"
      onClick={() => applyChangesAction(ctx)}
      disabled={!ctx.spy(isChangesAtom)}
    >
      Сохранить
    </Button>
  )
}, "ApplyChanges")

export default function SettingsEditProfilePage() {
  return (
    <div className="flex flex-col w-full h-full gap-8">
      <div className="flex flex-col w-full h-full gap-2">
        <h1 className="text-2xl font-bold text-foreground">
          Изменение профиля
        </h1>
        <p className="text-lg text-muted-foreground">
          Позаботьтесь о конфиденциальности личных данных.
          Добавляемая вами информация видна всем, кто может просматривать ваш профиль.
        </p>
      </div>
      <div className="flex flex-col gap-2 h-full w-full">
        <EditAvatar />
        <div className="flex flex-col">
          <p className="font-semibold text-lg">Имя</p>
          <EditName />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-lg">Описание</p>
          <EditDescription />
        </div>
      </div>
      <ApplyChanges />
    </div>
  )
}

const EditDescription = reatomComponent(({ ctx }) => {
  return (
    <Input
      type="text"
      className="w-2/4"
      maxLength={MAX_DESCRIPTION_LENGTH}
      value={ctx.spy(newDescriptionAtom) ?? ""}
      onChange={e => newDescriptionAtom(ctx, e.target.value)}
      placeholder="Введите описание"
    />
  )
})

const EditName = reatomComponent(({ ctx }) => {
  return (
    <Input
      type="text"
      className="w-2/4"
      maxLength={MAX_NAME_LENGTH}
      placeholder="Введите имя"
      value={ctx.spy(newNameAtom) ?? ""}
      onChange={e => newNameAtom(ctx, e.target.value)}
    />
  )
})