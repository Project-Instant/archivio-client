import { Link } from "@/shared/components/link/link"
import { authErrorAtom, isValidAtom, authAction, loginAtom, loginErrorAtom, passwordAtom, passwordErrorAtom, isLoginAtom } from "../models/auth.model"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Loader } from "@/shared/ui/loader"
import { reatomComponent } from "@reatom/npm-react"
import { authDialogIsOpenAtom } from "../models/auth-dialog.model"

const AuthFormSubmit = reatomComponent(({ ctx }) => {
  return (
    <Button
      disabled={!ctx.spy(isValidAtom)}
      onClick={() => authAction(ctx)}
      className="bg-emerald-600 self-end font-semibold py-2 px-4 min-w-1/3 text-lg hover:bg-emerald-700 text-white"
    >
      {ctx.spy(isLoginAtom) ? "Войти" : "Зарегистрироваться"}
    </Button>
  )
}, "AuthFormSubmit")

const AuthFormInput = reatomComponent(({ ctx }) => {
  return (
    <>
      <Input
        value={ctx.spy(loginAtom)}
        placeholder="Введите логин"
        type="text"
        aria-invalid={!!ctx.spy(loginErrorAtom)}
        onChange={(e) => loginAtom(ctx, e.target.value)}
        spellCheck={false}
      />
      <span className="text-red-400 text-sm">
        {ctx.spy(loginErrorAtom) && ctx.spy(loginErrorAtom)}
      </span>
    </>
  )
}, "AuthFormInput")

const AuthFormPassword = reatomComponent(({ ctx }) => {
  return (
    <>
      <Input
        value={ctx.spy(passwordAtom)}
        placeholder="Введите пароль"
        aria-invalid={!!ctx.spy(passwordErrorAtom)}
        onChange={(e) => passwordAtom(ctx, e.target.value)}
        type="password"
        spellCheck={false}
      />
      <span className="text-red-400 text-sm">
        {ctx.spy(passwordErrorAtom) && ctx.spy(passwordErrorAtom)}
      </span>
    </>
  )
}, "AuthFormPassword")

const AuthChangeAuthType = reatomComponent(({ ctx }) => {
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
}, "AuthChangeAuthType")

const LoginForm = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <span className="text-lg">Логин</span>
        <AuthFormInput />
      </div>
      <div className="flex flex-col w-full">
        <span className="text-lg">Пароль</span>
        <AuthFormPassword />
      </div>
      <Link href="#" className="w-fit text-sm text-right hover:underline">
        Забыли пароль?
      </Link>
    </>
  )
}

const RegisterForm = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <span className="text-lg">Логин</span>
        <AuthFormInput />
      </div>
      <div className="flex flex-col w-full">
        <span className="text-lg">Пароль</span>
        <AuthFormPassword />
      </div>
    </>
  )
}

export const AuthFormWrapper = reatomComponent(({ ctx }) => {
  if (ctx.spy(authDialogIsOpenAtom)) return null;

  return <AuthForm />;
}, "AuthFormWrapper")

export const AuthForm = reatomComponent(({ ctx }) => {
  const isPending = ctx.spy(authAction.statusesAtom).isPending

  return (
    <div
      data-state={ctx.spy(isLoginAtom) ? "login" : "register"}
      className="flex flex-col bg-background items-center justify-center m-2 gap-2 max-w-lg sm:m-0 p-6 rounded-xl relative
        border-2 data-[state=login]:border-transparent data-[state=register]:border-emerald-600"
    >
      {isPending && (
        <div className="absolute z-[5] rounded-3xl bg-muted-foreground/60 w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      <img src="/logo_no_bg.png" width={128} height={128} alt="" />
      <div className="flex flex-col items-center gap-1">
        <p className="text-2xl font-semibold">
          {ctx.spy(isLoginAtom) ? "С возвращением" : "Добро пожаловать"}
        </p>
        {/* {!ctx.spy(isLoginAtom) && (
          <span className="text-muted-foreground">Find new ideas to try</span>
        )} */}
      </div>
      <div
        data-state={isPending ? "pending" : "stale"}
        className="flex flex-col px-6 py-4 gap-4 relative w-full data-[state=pending]:pointer-events-none"
      >
        {ctx.spy(isLoginAtom) ? <LoginForm /> : <RegisterForm />}
        <AuthFormSubmit />
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-l from-white to-white/10" />
          <span className="text-white text-xs">*</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white to-white/10" />
        </div>
        <p className="text-sm text-center text-white/60 mt-2">
          Продолжая, вы принимаете {" "}
          <Link href="/terms" className="underline">
            Условия использования
          </Link>{" "}и{" "}
          <Link href="/privacy" className="underline">
            Политика конфиденциальности
          </Link>
        </p>
        {ctx.spy(authErrorAtom) && <span className="text-red-500 text-sm">{ctx.spy(authErrorAtom)}</span>}
        <div className="text-center font-semibold text-sm mt-4">
          <AuthChangeAuthType />
        </div>
      </div>
    </div>
  )
}, "AuthForm")