import { PropsWithChildren } from "react";
import type { Devtools } from "@reatom/devtools";
import { connectLogger, Ctx } from "@reatom/framework";
import { reatomContext, useCreateCtx, useUpdate } from '@reatom/npm-react'
import consola from "consola";
import { isSsr } from "../lib/utils/is-ssr";
import { snapshotAtom } from "../lib/utils/with-ssr";
import { usePageContext } from "vike-react/usePageContext";
import { pageContextAtom } from "@/(domains)/(auth)/models/user.model";

declare global {
  var DEVTOOLS: undefined | Devtools
}

async function loadDevtools(ctx: Ctx) {
  if (import.meta.env.DEV) {
    try {
      const { createDevtools } = await import('@reatom/devtools');

      globalThis.DEVTOOLS = createDevtools({ ctx });

      consola.success('Reatom DevTools connected.');
    } catch {
      globalThis.DEVTOOLS = undefined;
    }
  } else {
    globalThis.DEVTOOLS = undefined;
  }
}

const SyncPageContext = () => {
  const { isAuth, isBackwardNavigation } = usePageContext();

  useUpdate((ctx) =>
    pageContextAtom(ctx, { isAuth, isBackwardNavigation }),
    [usePageContext().isAuth, usePageContext().isBackwardNavigation]
  )

  return null;
}

const logger = (ctx: Ctx) => isSsr() && import.meta.env.DEV ? connectLogger(ctx) : undefined

const SyncDevtools = () => useUpdate(loadDevtools, [])
const SyncLogger = () => useUpdate(logger, [])

export function ReatomContextProvider({
  children
}: PropsWithChildren) {
  const { snapshot } = usePageContext()

  const ctx = useCreateCtx((ctx) => snapshotAtom(ctx, snapshot))

  return (
    <reatomContext.Provider value={ctx}>
      <SyncPageContext />
      <SyncDevtools />
      <SyncLogger />
      {children}
    </reatomContext.Provider>
  );
}