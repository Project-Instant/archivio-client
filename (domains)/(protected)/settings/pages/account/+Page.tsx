import { DeleteAccountButton, EditCountry, EditEmail, EditGender, EditLanguage, EditPassword } from "../../components/edit-account-form";

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