import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { reatomComponent, useAction, useAtom } from "@reatom/npm-react";
import { loginAction, loginAtom, loginErrorAtom, passwordAtom, passwordErrorAtom } from "@/(auth)/domain/user/user.model";
import { authDialogAtom, authorizeTypeAtom, openAuthDialogAction } from "@/(auth)/domain/ui/auth-dialog.model";

const AuthDialogFormSubmit = () => {
  const authorize = useAction(loginAction)

  return (
    <Button
      onClick={authorize}
      className="bg-red-600 hover:bg-red-700 text-white rounded-full"
    >
      Войти
    </Button>
  )
}

const AuthDialogFormInput = reatomComponent(({ ctx }) => {
  return (
    <>
      <Input
        value={ctx.spy(loginAtom)}
        placeholder="Логин"
        type="text"
        onChange={(e) => loginAtom(ctx, e.target.value)}
      />
      {ctx.spy(loginErrorAtom) && ctx.spy(loginErrorAtom)}
    </>
  )
}, "AuthDialogFormInput")

const AuthDialogFormPassword = reatomComponent(({ ctx }) => {
  return (
    <>
      <Input
        value={ctx.spy(passwordAtom)}
        placeholder="Пароль"
        onChange={(e) => passwordAtom(ctx, e.target.value)}
        type="password"
      />
      {ctx.spy(passwordErrorAtom) && ctx.spy(passwordErrorAtom)}
    </>
  )
}, "AuthDialogFormPassword")

const AuthDialogChangeAuthType = () => {
  const [authType, setAuthType] = useAtom(authorizeTypeAtom)

  const isLogin = authType === 'login'

  return (
    <div className="text-center text-sm mt-4">
      {isLogin ? "Еще не зарегистрированы?" : "Уже есть аккаунт?"}{" "}
      <span
        onClick={() => setAuthType(authType === 'login' ? "register" : "login")}
        className="font-semibold hover:underline"
      >
        {isLogin ? "Создать аккаунт" : "Войти в аккаунт"}
      </span>
    </div>
  )
}

const AuthDialogForm = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <AuthDialogFormInput />
      <AuthDialogFormPassword />
      <a href="#" className="text-xs text-gray-600 text-right hover:underline">
        Забыли пароль?
      </a>
      <AuthDialogFormSubmit />
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="text-gray-500 text-xs">ИЛИ</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>
      <p className="text-xs text-center text-gray-500 mt-2">
        Для продолжения регистрации вы должны принять условия{" "}
        <a href="/terms" className="underline">
          Условия использования
        </a>{" "}
        <a href="/privacy" className="underline">
          Политика конфиденциальности
        </a>.
      </p>
      <AuthDialogChangeAuthType />
    </div>
  )
}

export const AuthDialog = reatomComponent(({ ctx }) => {
  const openAction = useAction(openAuthDialogAction)

  return (
    <Dialog open={ctx.spy(authDialogAtom)} onOpenChange={v => openAction(v)}>
      <DialogContent className="max-w-lg rounded-4xl p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="text-4xl text-red-600">
            <img src="/logo_no_bg.png" width={128} height={128} alt="" />
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              Добро пожаловать
            </DialogTitle>
          </DialogHeader>
          <AuthDialogForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}, "AuthDialog")