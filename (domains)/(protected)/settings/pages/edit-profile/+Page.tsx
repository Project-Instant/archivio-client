import { userResource } from "@/(domains)/(auth)/models/user.model"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { AvatarImage } from "@radix-ui/react-avatar"
import { reatomComponent } from "@reatom/npm-react"
import { applyChangesAction, isChangesAtom, newDescriptionAtom, newNameAtom } from "../../models/edit-profile.model"
import { useRef } from "react"

const ApplyChanges = reatomComponent(({ ctx }) => {
  return (
    <Button
      className="bg-emerald-600 hover:bg-emerald-700 self-end w-fit px-4 text-lg text-white"
      onClick={() => applyChangesAction(ctx)}
      disabled={!ctx.spy(isChangesAtom)}
    >
      Сохранить
    </Button>
  )
}, "ApplyChanges")

export default function SettingsEditProfilePage() {
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <div className="flex flex-col w-full h-full gap-2">
        <h1 className="text-xl font-bold text-foreground">
          Изменение профиля
        </h1>
        <p className="text-lg text-muted-foreground">
          Позаботьтесь о конфиденциальности личных данных.
          Добавляемая вами информация видна всем, кто может просматривать ваш профиль.
        </p>
      </div>
      <div className="flex flex-col gap-6 h-full w-full">
        <EditAvatar />
        <EditName />
        <EditDescription />
        <ApplyChanges />
      </div>
    </div>
  )
}

const EditDescription = reatomComponent(({ ctx }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <span className="text-foreground text-base">Описание</span>
      <div className="flex items-center gap-4 w-full">
        <Input
          type="text"
          className="w-2/4"
          onChange={e => newDescriptionAtom(ctx, e.target.value)}
          placeholder="Введите описание"
          defaultValue={ctx.spy(userResource.dataAtom)?.description ?? ""}
        />
      </div>
    </div>
  )
})

const EditName = reatomComponent(({ ctx }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <span className="text-foreground text-base">Имя</span>
      <div className="flex items-center gap-4 w-full">
        <Input
          type="text"
          className="w-2/4"
          placeholder="Введите имя"
          onChange={e => newNameAtom(ctx, e.target.value)}
          defaultValue={ctx.spy(userResource.dataAtom)?.name ?? ""}
        />
      </div>
    </div>
  )
})

const EditAvatar = reatomComponent(({ ctx }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  return (
    <div className="flex items-end w-full gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar className="w-32 h-32">
          <AvatarImage src={ctx.spy(userResource.dataAtom)?.avatarUrl ?? undefined} />
          <AvatarFallback />
        </Avatar>
      </div>
      <div className="relative flex">
        <Button onClick={handleClick} className="text-lg font-semibold">
          Изменить
        </Button>
        <input
          ref={inputRef}
          type="file"
          multiple={false}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}, "EditAvatar")