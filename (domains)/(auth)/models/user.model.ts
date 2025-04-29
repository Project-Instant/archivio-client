import {
  AsyncCtx, reatomAsync, reatomResource, withCache,
  withDataAtom, withErrorAtom, withRetry, withStatusesAtom
} from "@reatom/async";
import AvatarExample from "@/assets/cover-example.webp"
import { toast } from "sonner"
import * as S from "sury"
import { navigate } from 'vike/client/router'
import ky, { HTTPError } from "ky"
import { authDialogAtom } from "./auth-dialog.model";
import { Action, atom, AtomMut, Ctx, sleep, withComputed, withReset } from "@reatom/framework";

export type User = {
  login: string
  name: string;
  avatarUrl: string | null
}

type BaseResult = {
  Data: string | null,
  ErrorMessage: string | null,
  ErrorCode: number,
  IsSuccess: boolean
}

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
  await ctx.schedule(() => sleep(50))

  if (isAuth) {
    return await ctx.schedule(() => currentUserData)
  }

  return await ctx.schedule(() => null)
}, "userResource").pipe(
  withDataAtom(),
  withErrorAtom(),
  withCache(),
  withRetry(),
  withStatusesAtom()
)

function resetAtoms(ctx: AsyncCtx | Ctx) {
  loginAtom.reset(ctx)
  passwordAtom.reset(ctx)
  loginErrorAtom.reset(ctx)
  passwordErrorAtom.reset(ctx)
}

export const authAction = reatomAsync(async (ctx) => {
  const parsed = S.safe(() =>
    S.parseOrThrow({
      login: ctx.get(loginAtom), password: ctx.get(passwordAtom)
    }, loginFormSchema)
  )

  if (!parsed.success) {
    return await ctx.schedule(() => authErrorAtom(
      ctx, "Упс, произошла какая-то ошибка. Повторите попытку позже")
    )
  }

  const { login, password } = parsed.value

  try {
    switch (ctx.get(isLoginAtom)) {
      case true:
        async function loginRequest(): Promise<BaseResult> {
          await ctx.schedule(() => sleep(5000))

          return {
            Data: "success",
            ErrorMessage: null,
            ErrorCode: 0,
            IsSuccess: true
          }
        }

        // const loginRequest = await ky.post("https://0n28bw-95-73-214-243.ru.tuna.am/api/Auth/login", {
        //   json: {
        //     Login: login, Password: password
        //   },
        //   headers: {
        //     "tuna-skip-browser-warning": "asd",
        //     "Content-Type": "application/json"
        //   },
        //   credentials: "include"
        // }).json<BaseResult>()

        console.log(loginRequest)

        const response = await loginRequest()

        if (!response.IsSuccess) {
          return await ctx.schedule(() => authErrorAtom(
            ctx, response.ErrorMessage ?? "Упс, произошла какая-то ошибка. Повторите попытку позже")
          )
        }

        if (response.IsSuccess) {
          function success() {
            toast.success("Телепортируем...", { position: "top-center" })

            userResource.dataAtom(ctx, { avatarUrl: currentUserData.avatarUrl, login, name: login })
            authDialogAtom(ctx, false)

            resetAtoms(ctx)
            navigate(`/u/${login}`)
          }

          return ctx.schedule(() => success())
        }
        break;
      case false:
        // const loginRequest = await ky.post("http://localhost:8000/register", {
        //   json: {
        //     login, password
        //   },
        //   credentials: "include"
        // }).json<BaseResult>()

        async function registerRequest(): Promise<BaseResult> {
          await ctx.schedule(() => sleep(5000))

          return {
            Data: "success",
            ErrorMessage: null,
            ErrorCode: 0,
            IsSuccess: true
          }
        }

        const registerResponse = await registerRequest()

        if (!registerResponse.IsSuccess) {
          return await ctx.schedule(() => authErrorAtom(
            ctx, response.ErrorMessage ?? "Упс, произошла какая-то ошибка. Повторите попытку позже")
          )
        }

        if (registerResponse.IsSuccess) {
          function resetAtoms() {
            loginAtom.reset(ctx)
            passwordAtom.reset(ctx)
            loginErrorAtom.reset(ctx)
            passwordErrorAtom.reset(ctx)
          }

          function success() {
            toast.success("Регистрация успешна. Теперь вы можете войти в аккаунт", { position: "top-center" })

            resetAtoms()
            isLoginAtom(ctx, true)
          }

          return ctx.schedule(() => success())
        }
        break;
    }
  } catch (e) {
    if (e instanceof HTTPError) {
      return await ctx.schedule(() => authErrorAtom(ctx, e.message))
    } else {
      return await ctx.schedule(() => {
        authErrorAtom(ctx, "Произошла ошибка")
      })
    }
  }
}, "authAction").pipe(withStatusesAtom())