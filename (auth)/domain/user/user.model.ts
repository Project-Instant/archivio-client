import { atom, reatomResource, withCache, withDataAtom, withErrorAtom, withRetry } from "@reatom/framework";
import AvatarExample from "@/assets/cover-example.webp"
import { Action, AtomMut, Ctx, reatomAsync, withReset } from "@reatom/framework"
import { toast } from "sonner"
import * as S from "sury"
import { navigate } from 'vike/client/router'

export type User = {
  login: string
  name: string;
  avatarUrl: string | null
}

export const currentUserData = {
  login: "belkin",
  name: "Rus Belkin",
  avatarUrl: AvatarExample
}

export const userAtom = atom<User | null>(null, "userAtom")

export const userResource = reatomResource(async (ctx) => {
  // userAtom(ctx, currentUserData)

  return ctx.schedule((ctx) => currentUserData)
}, "userResource").pipe(
  withDataAtom(),
  withErrorAtom(),
  withCache(),
  withRetry()
)

const loginSchema = S.string
  .with(S.min, 5, "Слишком короткий логин")
  .with(S.max, 18, "Слишком длинный логин")

const passwordSchema = S.string
  .with(S.min, 6, "Слишком короткий пароль")
  .with(S.max, 32, "Слишком длинный пароль")

const loginFormSchema = S.schema({
  login: loginSchema,
  password: passwordSchema,
});

export const passwordAtom = atom("", "passwordAtom").pipe(withReset())
export const loginAtom = atom("", "loginAtom").pipe(withReset())

export const loginErrorAtom = atom<string | null>(null, "loginErrorAtom").pipe(withReset())
export const passwordErrorAtom = atom<string | null>(null, "passwordErrorAtom").pipe(withReset())

export const registerAction = reatomAsync((ctx) => {
  toast("Спасибо за регистрацию!", {
    description: "Теперь войдите в аккаунт"
  })

  return ctx.schedule((ctx) => { })
})

export const loginAction = reatomAsync(async (ctx) => {
  const parsed = S.safe(() =>
    S.parseOrThrow({
      login: ctx.get(loginAtom), password: ctx.get(passwordAtom)
    }, loginFormSchema)
  )

  if (!parsed.success) {
    toast.error("Произошла ошибкка при входе", {
      description: "Повторите позже"
    })

    return ctx.schedule((ctx) => { })
  }

  const { login, password } = parsed.value

  // validate from api
  // const loginRequest = await ky.post("...", {
  //   json: {
  //     login, password
  //   },
  //   credentials: true
  // })

  // if error
  // toast.success("Произошла ошибка при входе...", {
  //   position: "top-center"
  // })

  // if success
  toast.success("Телепортируем...", {
    position: "top-center"
  })

  function success() {
    userAtom(ctx, { avatarUrl: null, login, name: login })
    navigate(`/u/${login}`)
  }

  return ctx.schedule(() => success())
}, "loginAction")

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

loginAtom.onChange(createValidatorField(loginSchema, loginErrorAtom))
passwordAtom.onChange(createValidatorField(passwordSchema, passwordErrorAtom))