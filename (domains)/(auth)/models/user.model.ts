import { atom, CtxSpy } from "@reatom/framework";
import { ApiResponse, client } from "@/shared/api/api-client";
import { PageContext } from "vike/types";
import { withSsr } from "@/shared/lib/utils/with-ssr";
import consola from "consola";

export type User = {
  id: number;
  login: string
  name: string | null;
  avatarUrl: string | null,
  createdAt: Date,
  description: string | null;
  coverUrl: string | null
}

type PageContextAtom = Pick<PageContext, "isAuth" | "isBackwardNavigation">

export const currentUserAtom = atom<User | null>(null, "currentUserAtom").pipe(
  withSsr("currentUserAtom")
)

export const pageContextAtom = atom<PageContextAtom | null>(null, "pageContextAtom")
pageContextAtom.onChange((ctx, state) => {
  if (state) {
    isAuthAtom(ctx, state.isAuth)
  }
  consola.info("PageContext onChange", state)
})

export const isAuthAtom = atom(false, "isAuthAtom")

type GetUserOptions = {
  headers: Record<string, string> | undefined
}

export async function getUser(options: GetUserOptions): Promise<User | null> {
  const res = await client.get("user/get-me", { headers: options.headers, throwHttpErrors: false })
  const json = await res.json<ApiResponse<User>>()

  if (!res.ok || !json.isSuccess) {
    return null;
  }

  return {
    ...json.data,
    avatarUrl: json.data.login === 'belkin'
      ? "https://images.unsplash.com/photo-1744195467963-7d73a219a277?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      : null,
    coverUrl: "https://images.unsplash.com/photo-1745282480794-10427e218c76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
}

export const getCurrentUser = (ctx: CtxSpy) => ctx.spy(currentUserAtom)