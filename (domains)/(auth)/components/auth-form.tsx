import { Link } from "@/shared/components/link/Link"
import { authErrorAtom, isValidAtom, authAction, loginAtom, loginErrorAtom, passwordAtom, passwordErrorAtom, isLoginAtom } from "../models/user.model"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Loader } from "@/shared/ui/loader"
import { reatomComponent } from "@reatom/npm-react"
import { authDialogAtom } from "../models/auth-dialog.model"

const AuthDialogFormSubmit = reatomComponent(({ ctx }) => {
  return (
    <Button
      disabled={!ctx.spy(isValidAtom)}
      onClick={() => authAction(ctx)}
      className="bg-red-600 self-end font-semibold py-2 px-4 min-w-1/3 text-lg hover:bg-red-700 text-white rounded-full"
    >
      {ctx.spy(isLoginAtom) ? "Войти" : "Зарегистрироваться"}
    </Button>
  )
}, "AuthDialogFormSubmit")

const AuthDialogFormInput = reatomComponent(({ ctx }) => {
  return (
    <>
      <Input
        value={ctx.spy(loginAtom)}
        placeholder="Логин"
        type="text"
        aria-invalid={!!ctx.spy(loginErrorAtom)}
        onChange={(e) => loginAtom(ctx, e.target.value)}
      />
      <span className="text-red-400 text-sm">
        {ctx.spy(loginErrorAtom) && ctx.spy(loginErrorAtom)}
      </span>
    </>
  )
}, "AuthDialogFormInput")

const AuthDialogFormPassword = reatomComponent(({ ctx }) => {
  return (
    <>
      <Input
        value={ctx.spy(passwordAtom)}
        placeholder="Пароль"
        aria-invalid={!!ctx.spy(passwordErrorAtom)}
        onChange={(e) => passwordAtom(ctx, e.target.value)}
        type="password"
      />
      <span className="text-red-400 text-sm">
        {ctx.spy(passwordErrorAtom) && ctx.spy(passwordErrorAtom)}
      </span>
    </>
  )
}, "AuthDialogFormPassword")

const AuthDialogChangeAuthType = reatomComponent(({ ctx }) => {
  return (
    <>
      {ctx.spy(isLoginAtom) ? "Еще не зарегистрированы?" : "Уже есть аккаунт?"}{" "}
      <span
        onClick={() => isLoginAtom(ctx, (state) => !state)}
        className="hover:underline cursor-pointer"
      >
        {ctx.spy(isLoginAtom) ? "Создать аккаунт" : "Войти в аккаунт"}
      </span>
    </>
  )
}, "AuthDialogChangeAuthType")

const LoginForm = () => {
  return (
    <>
      <AuthDialogFormInput />
      <div className="flex flex-col w-full gap-1">
        <span className="text-foreground text-base">Пароль</span>
        <AuthDialogFormPassword />
      </div>
      <Link href="#" className="w-fit text-xs text-gray-600 text-right hover:underline">
        Забыли пароль?
      </Link>
    </>
  )
}

const RegisterForm = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-1">
        <span className="text-foreground text-base">Логин</span>
        <AuthDialogFormInput />
      </div>
      <AuthDialogFormPassword />
    </>
  )
}

export const AuthDialogForm = reatomComponent(({ ctx }) => {

  const isPending = ctx.spy(authAction.statusesAtom).isPending

  return (
    <div className="flex flex-col bg-background items-center justify-center m-2 gap-6 max-w-lg sm:m-0 p-6 rounded-3xl relative">
      {isPending && (
        <div className="absolute z-[5] rounded-3xl bg-muted-foreground/60 w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      <img src="/logo_no_bg.png" width={128} height={128} alt="" />
      <div className="flex flex-col items-center gap-1">
        <p className="text-2xl font-semibold">
          Добро пожаловать
        </p>
        {!ctx.spy(isLoginAtom) && (
          <span className="text-muted-foreground">Find new ideas to try</span>
        )}
      </div>
      <div
        data-state={isPending ? "pending" : "stale"}
        className="flex flex-col px-6 py-4 gap-4 relative w-full data-[state=pending]:pointer-events-none"
      >
        {ctx.spy(isLoginAtom) ? <LoginForm /> : <RegisterForm />}
        <AuthDialogFormSubmit />
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-gray-500 text-xs">*</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
        <p className="text-xs text-center text-gray-500 mt-2">
          Продолжая, вы принимаете {" "}
          <a href="/terms" className="underline">
            Условия использования
          </a>{" "}и{" "}
          <a href="/privacy" className="underline">
            Политика конфиденциальности
          </a>
        </p>
        {ctx.spy(authErrorAtom) && <span className="text-red-500 text-sm">{ctx.spy(authErrorAtom)}</span>}
        <div className="text-center font-semibold text-sm mt-4">
          <AuthDialogChangeAuthType />
        </div>
      </div>
    </div>
  )
}, "AuthDialogForm")