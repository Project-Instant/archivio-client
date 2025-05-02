import {
  AsyncCtx, reatomAsync, reatomResource, withCache,
  withDataAtom, withErrorAtom, withRetry, withStatusesAtom
} from "@reatom/async";
import AvatarExample from "@/assets/cover-example.webp"
import { toast } from "sonner"
import * as S from "sury"
import { navigate } from 'vike/client/router'
import { authDialogAtom } from "./auth-dialog.model";
import { Action, atom, AtomMut, Ctx, withComputed, withReset } from "@reatom/framework";
import { client } from "@/shared/api/api-client";
import { wrapLink } from "@/shared/lib/wrap-link";

export type User = {
  login: string
  name: string;
  avatarUrl: string | null
}

export type Response = {
  data: string | null,
  errorMessage: string | null,
  errorCode: number,
  isSuccess: boolean
}

const DEFAULT_ERROR_MSG = "Упс, произошла какая-то ошибка. Повторите попытку позже"

export const currentUserData = {
  login: "belkin",
  name: "Rus Belkin",
  avatarUrl: AvatarExample
}

const loginSchema = S.string
  .with(S.min, 5, "Слишком короткий логин")
  .with(S.max, 18, "Слишком длинный логин")

const passwordSchema = S.string
  .with(S.min, 6, "Слишком короткий пароль")
  .with(S.max, 32, "Слишком длинный пароль")

const loginFormSchema = S.schema({
  login: loginSchema, password: passwordSchema,
});

export const passwordAtom = atom("", "passwordAtom").pipe(withReset())
export const loginAtom = atom("", "loginAtom").pipe(withReset())
export const loginErrorAtom = atom<string | null>(null, "loginErrorAtom").pipe(withReset())
export const passwordErrorAtom = atom<string | null>(null, "passwordErrorAtom").pipe(withReset())
export const authErrorAtom = atom<string | null>(null, "authErrorAtom")
export const isLoginAtom = atom<boolean>(true, "authorizeTypeAtom")

loginAtom.onChange(createValidatorField(loginSchema, loginErrorAtom))
passwordAtom.onChange(createValidatorField(passwordSchema, passwordErrorAtom))
isLoginAtom.onChange((ctx) => resetAtoms(ctx))

function resetAtoms(ctx: AsyncCtx | Ctx) {
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
    if (state === true) {
      ctx.spy(userResource.dataAtom)
    }

    return state;
  })
)

export const logoutAction = reatomAsync(async (ctx) => {
  return await ctx.schedule(async (ctx) => {
    userResource.dataAtom(ctx, null)
    return await navigate("/auth")
  })
})

export const userResource = reatomResource<User | null>(async (ctx) => {
  const isAuth = ctx.spy(isAuthAtom)

  if (isAuth) return await ctx.schedule(() => currentUserData)
  
  return await ctx.schedule(() => null)
}, "userResource").pipe(
  withDataAtom(), 
  withErrorAtom(),
  withCache(), 
  withRetry(), 
  withStatusesAtom()
)

export const authAction = reatomAsync(async (ctx) => {
  const parsed = S.safe(() =>
    S.parseOrThrow({
      login: ctx.get(loginAtom), password: ctx.get(passwordAtom)
    }, loginFormSchema)
  )

  if (!parsed.success) return await ctx.schedule(() => authErrorAtom(ctx, DEFAULT_ERROR_MSG))

  try {
    if (ctx.get(isLoginAtom)) {
      const response = await client.post("auth/login", {
        json: { Login: parsed.value.login, Password: parsed.value.password },
        throwHttpErrors: false
      })

      const json = await response.json<Response>()

      if (!response.ok || !json.isSuccess) {
        return await ctx.schedule(() => authErrorAtom(ctx, json.errorMessage ?? DEFAULT_ERROR_MSG))
      }

      if (json.data) {
        return await ctx.schedule(() => {
          toast.success("Телепортируем...", { position: "top-center" })

          userResource.dataAtom(ctx, { 
            avatarUrl: currentUserData.avatarUrl, 
            login: parsed.value.login, 
            name: parsed.value.login 
          })

          authDialogAtom(ctx, false)
          resetAtoms(ctx)
          navigate(wrapLink(parsed.value.login, "user"))
        })
      }
    } else {
      const response = await client.post("auth/register", {
        json: { 
          Login: parsed.value.login, 
          Password: parsed.value.password 
        },
        throwHttpErrors: false
      })
      
      const json = await response.json<Response>()

      if (!response.ok || !json.isSuccess) {
        return await ctx.schedule(() => authErrorAtom(ctx, json.errorMessage ?? DEFAULT_ERROR_MSG))
      }

      if (json.data) {
        return await ctx.schedule(() => {
          toast.success("Регистрация успешна. Теперь вы можете войти в аккаунт", {
            position: "top-center"
          })

          resetAtoms(ctx)
          isLoginAtom(ctx, true)
        })
      }
    }
  } catch (e) {
    if (ctx.get(authErrorAtom)) return;

    authErrorAtom(ctx, DEFAULT_ERROR_MSG)
  }
}, "authAction").pipe(
  withStatusesAtom()
)