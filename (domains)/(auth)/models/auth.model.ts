import { ApiResponse, client } from "@/shared/api/api-client"
import { AsyncCtx, reatomAsync, withStatusesAtom } from "@reatom/async"
import { currentUserAtom } from "./user.model"
import { toast } from "sonner"
import { reload } from 'vike/client/router'
import { authDialogIsOpenAtom } from "./auth-dialog.model";
import { wrapLink } from "@/shared/lib/helpers/wrap-link";
import { Action, atom, AtomMut, Ctx } from "@reatom/core"
import { withComputed, withReset } from "@reatom/framework"
import { sanitazeParseErrorString } from "@/shared/lib/helpers/validate-string"
import * as Sury from "sury"

const DEFAULT_ERROR_MSG = "Упс, произошла какая-то ошибка. Повторите попытку позже"

const loginSchema = Sury.string.with(Sury.min, 5, "Слишком короткий логин").with(Sury.max, 18, "Слишком длинный логин")
const passwordSchema = Sury.string.with(Sury.min, 6, "Слишком короткий пароль").with(Sury.max, 32, "Слишком длинный пароль")
const loginFormSchema = Sury.schema({ login: loginSchema, password: passwordSchema, });

export const passwordAtom = atom("", "passwordAtom").pipe(withReset())
export const loginAtom = atom("", "loginAtom").pipe(withReset())

export const loginErrorAtom = atom<string | null>(null, "loginErrorAtom").pipe(withReset())
export const passwordErrorAtom = atom<string | null>(null, "passwordErrorAtom").pipe(withReset())
export const authErrorAtom = atom<string | null>(null, "authErrorAtom").pipe(withReset())

export const isLoginAtom = atom<boolean>(true, "authorizeTypeAtom")

export const isValidAtom = atom(false, "isValidAtom").pipe(
  withComputed((ctx) => {
    const value = Sury.safe(() => Sury.parseOrThrow(
      { login: ctx.spy(loginAtom), password: ctx.spy(passwordAtom) },
      loginFormSchema
    ))

    return value.success === true
  })
)

loginAtom.onChange(createValidatorField(loginSchema, loginErrorAtom))
passwordAtom.onChange(createValidatorField(passwordSchema, passwordErrorAtom))
isLoginAtom.onChange((ctx) => resetAtoms(ctx))

function resetAtoms(ctx: AsyncCtx | Ctx) {
  authErrorAtom.reset(ctx)
  loginAtom.reset(ctx)
  passwordAtom.reset(ctx)
  loginErrorAtom.reset(ctx)
  passwordErrorAtom.reset(ctx)
}

function createValidatorField<T>(
  schema: Sury.Schema<T>,
  errorAtom: AtomMut<string | null> & { reset: Action<[], string | null> }
) {
  return (ctx: Ctx, state: unknown) => {
    const result = Sury.safe(() => Sury.parseOrThrow(state, schema));

    if (result.success) {
      errorAtom.reset(ctx);
    } else {
      errorAtom(ctx, sanitazeParseErrorString(result.error.message));
    }
  };
}

export const logoutAction = reatomAsync(async (ctx) => {
  const logout = await client.post("auth/logout", { throwHttpErrors: false })
  const json = await logout.json<ApiResponse<string>>()

  if (json.data?.includes("Logged Out")) {
    currentUserAtom(ctx, null)

    return reload()
  }
}, "logoutAction")

export const authAction = reatomAsync(async (ctx) => {
  const parsed = Sury.safe(() => Sury.parseOrThrow({
    login: ctx.get(loginAtom),
    password: ctx.get(passwordAtom)
  }, loginFormSchema))

  if (!parsed.success) {
    authErrorAtom(ctx, DEFAULT_ERROR_MSG);
    return;
  }

  try {
    if (ctx.get(isLoginAtom)) {
      const response = await client.post("auth/login", {
        json: { Login: parsed.value.login, Password: parsed.value.password },
        throwHttpErrors: false
      })

      const json = await response.json<ApiResponse<string>>()

      if (!response.ok || !json.isSuccess) {
        authErrorAtom(ctx, json.errorMessage ?? DEFAULT_ERROR_MSG)
        return
      }

      if (json.data) {
        return await ctx.schedule(() => {
          toast.success("Телепортируем...")

          authDialogIsOpenAtom(ctx, false)
          resetAtoms(ctx)
          return window.location.href = wrapLink(parsed.value.login, "user")
        })
      }
    } else {
      const response = await client.post("auth/register", {
        json: { Login: parsed.value.login, Password: parsed.value.password },
        throwHttpErrors: false
      })

      const json = await response.json<ApiResponse<string>>()

      if (!response.ok || !json.isSuccess) {
        authErrorAtom(ctx, json.errorMessage ?? DEFAULT_ERROR_MSG)
        return
      }

      if (json.data) {
        return await ctx.schedule(() => {
          toast.success("Регистрация успешна. Теперь вы можете войти в аккаунт")

          resetAtoms(ctx);
          isLoginAtom(ctx, true);
        })
      }
    }
  } catch {
    if (ctx.get(authErrorAtom)) return;

    authErrorAtom(ctx, DEFAULT_ERROR_MSG)
  }
}, "authAction").pipe(withStatusesAtom())