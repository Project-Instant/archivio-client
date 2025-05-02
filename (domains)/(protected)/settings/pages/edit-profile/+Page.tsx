import { userResource } from "@/(domains)/(auth)/models/user.model"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { AvatarImage } from "@radix-ui/react-avatar"
import { reatomComponent } from "@reatom/npm-react"

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
      </div>
    </div>
  )
}

const EditDescription = reatomComponent(({ ctx }) => {
  const user = ctx.spy(userResource.dataAtom)

  return (
    <div className="flex flex-col w-full gap-2">
      <span className="text-foreground text-base">Описание</span>
      <div className="flex items-center gap-4 w-full">
        <Input
          type="text"
          className="w-2/4"
          placeholder="Введите описание"
          defaultValue={user?.description ?? ""}
        />
      </div>
    </div>
  )
})

const EditName = reatomComponent(({ ctx }) => {
  const user = ctx.spy(userResource.dataAtom)

  return (
    <div className="flex flex-col w-full gap-2">
      <span className="text-foreground text-base">Имя</span>
      <div className="flex items-center gap-4 w-full">
        <Input
          type="text"
          className="w-2/4"
          placeholder="Введите имя"
          defaultValue={user?.name ?? ""}
        />
      </div>
    </div>
  )
})

const EditAvatar = reatomComponent(({ ctx }) => {
  return (
    <div className="flex items-end w-full gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar className="w-32 h-32">
          <AvatarImage src={ctx.spy(userResource.dataAtom)?.avatarUrl ?? undefined} />
          <AvatarFallback />
        </Avatar>
      </div>
      <Button className="text-lg font-semibold">
        Изменить
      </Button>
    </div>
  )
}, "EditAvatar")