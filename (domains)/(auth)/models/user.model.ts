import { reatomAsync, withAbort, withErrorAtom, withRetry, withStatusesAtom } from "@reatom/async";
import { atom, CtxSpy } from "@reatom/framework";
import { ApiResponse, client } from "@/shared/api/api-client";
import consola from "consola";
import { PageContext } from "vike/types";

export type User = {
  id: number;
  login: string
  name: string | null;
  avatarUrl: string | null,
  createdAt: Date,
  description: string | null;
  coverUrl: string | null
}

type PageContextAtom = Pick<PageContext, "isAuth" | "isPageContext" | "isBackwardNavigation"> | null

export const currentUserAtom = atom<User | null>(null, "currentUserAtom")
currentUserAtom.onChange((_, state) => consola.info("Current user", state))

export const pageContextAtom = atom<PageContextAtom>(null, "pageContextAtom")
pageContextAtom.onChange((ctx, state) => {
  if (state) {
    isAuthAtom(ctx, state.isAuth)
  }
  consola.info("PageContext onChange", state)
})

export const isAuthAtom = atom(false, "isAuthAtom")
isAuthAtom.onChange((ctx, state) => {
  if (state && !ctx.get(currentUserAtom)) {
    currentUserAction(ctx)
  }
})

async function getUser(signal: AbortSignal): Promise<User | null> {
  const res = await client.get("user/get-me", { signal })
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

export const currentUserAction = reatomAsync(async (ctx) => {
  return await ctx.schedule(async () => {
    const user = await getUser(ctx.controller.signal)

    if (!user) {
      return null;
    }

    return currentUserAtom(ctx, user)
  })
}, "currentUserAction").pipe(withErrorAtom(), withRetry(), withStatusesAtom(), withAbort())

type GetCurrentUserOptionsReturnNull = {
  throwError: false;
};

type GetCurrentUserOptionsDefaultOrThrow = {
  throwError?: true;
};

export function getCurrentUser(ctx: CtxSpy, options: GetCurrentUserOptionsReturnNull): User | null;
export function getCurrentUser(ctx: CtxSpy, options?: GetCurrentUserOptionsDefaultOrThrow): User;
export function getCurrentUser(ctx: CtxSpy, options?: GetCurrentUserOptionsReturnNull | GetCurrentUserOptionsDefaultOrThrow): User | null {
  const target = ctx.spy(currentUserAtom)

  if (!target) {
    if (options?.throwError === true) {
      throw new Error("User not defined");
    }

    return null;
  }

  return target;
}