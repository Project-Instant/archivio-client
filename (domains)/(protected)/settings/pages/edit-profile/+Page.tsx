import { EditDescription, EditName, EditAvatar, EditProfileApply } from "../../components/edit-profile-form"

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
      <EditProfileApply />
    </div>
  )
}