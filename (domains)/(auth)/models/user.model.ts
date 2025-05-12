import {
  AsyncCtx, reatomAsync, withAbort, withCache, withErrorAtom, withRetry, withStatusesAtom
} from "@reatom/async";
import { toast } from "sonner"
import * as S from "sury"
import { navigate } from 'vike/client/router'
import { authDialogAtom } from "./auth-dialog.model";
import { Action, atom, AtomMut, Ctx, withComputed, withReset } from "@reatom/framework";
import { ApiResponse, client } from "@/shared/api/api-client";
import { wrapLink } from "@/shared/lib/helpers/wrap-link";

export type User = {
  id: number;
  login: string
  name: string | null;
  avatarUrl: string | null,
  createdAt: Date,
  description: string | null;
}

const DEFAULT_ERROR_MSG = "Упс, произошла какая-то ошибка. Повторите попытку позже"

const loginSchema = S.string
  .with(S.min, 5, "Слишком короткий логин").with(S.max, 18, "Слишком длинный логин")

const passwordSchema = S.string
  .with(S.min, 6, "Слишком короткий пароль").with(S.max, 32, "Слишком длинный пароль")

const loginFormSchema = S.schema({
  login: loginSchema, password: passwordSchema,
});

export const currentUserAtom = atom<User | null>(null, "currentUserAtom")

export const passwordAtom = atom("", "passwordAtom").pipe(withReset())
export const loginAtom = atom("", "loginAtom").pipe(withReset())

export const loginErrorAtom = atom<string | null>(null, "loginErrorAtom").pipe(withReset())
export const passwordErrorAtom = atom<string | null>(null, "passwordErrorAtom").pipe(withReset())
export const authErrorAtom = atom<string | null>(null, "authErrorAtom").pipe(withReset())

export const isLoginAtom = atom<boolean>(true, "authorizeTypeAtom")

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
  schema: S.Schema<T>,
  errorAtom: AtomMut<string | null> & { reset: Action<[], string | null> }
) {
  return (ctx: Ctx, state: unknown) => {
    const result = S.safe(() => S.parseOrThrow(state, schema));

    if (result.success) {
      errorAtom.reset(ctx);
    } else {
      errorAtom(ctx, result.error.message.replace("Failed parsing:", "").trim());
    }
  };
}

export const isValidAtom = atom(false, "isValidAtom").pipe(
  withComputed((ctx) => {
    const value = S.safe(() => S.parseOrThrow(
      { login: ctx.spy(loginAtom), password: ctx.spy(passwordAtom) },
      loginFormSchema
    ))

    return value.success === true
  })
)

export const isAuthAtom = atom<boolean>(false, "isAuthAtom").pipe(
  withComputed((ctx, state) => {
    if (state === true) currentUserAction(ctx)

    return state;
  })
)

export const logoutAction = reatomAsync(async (ctx) => {
  const logout = await client.post("auth/logout", { throwHttpErrors: false })
  const json = await logout.json<ApiResponse<string>>()

  if (json.data?.includes("Logged Out")) {
    currentUserAtom(ctx, null)

    return window.location.reload()
  }

  return;
}, "logoutAction")

export const currentUserAction = reatomAsync(async (ctx) => {
  const res = await client.get("user/get-me", { signal: ctx.controller.signal })

  if (!res.ok) return null;

  const json = await res.json<ApiResponse<User>>()

  return currentUserAtom(ctx, json.data)
}, "currentUserAction").pipe(withErrorAtom(), withRetry(), withCache(), withStatusesAtom(), withAbort())

export const authAction = reatomAsync(async (ctx) => {
  const parsed = S.safe(() => S.parseOrThrow({
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
          toast.success("Телепортируем...", { position: "top-center" })

          authDialogAtom(ctx, false)
          resetAtoms(ctx)
          return navigate(wrapLink(parsed.value.login, "user"))
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
          toast.success("Регистрация успешна. Теперь вы можете войти в аккаунт", {
            position: "top-center"
          })

          resetAtoms(ctx);
          isLoginAtom(ctx, true);
        })
      }
    }
  } catch (e) {
    if (ctx.get(authErrorAtom)) return;

    authErrorAtom(ctx, DEFAULT_ERROR_MSG)
  }
}, "authAction").pipe(withStatusesAtom())

isAuthAtom.onChange((_, v) => console.log(`isAuth: ${v}`))
// currentUserAtom.onChange((_, v) => console.log(v))