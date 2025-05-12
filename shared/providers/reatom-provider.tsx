import { PropsWithChildren } from "react";
import type { Devtools } from "@reatom/devtools";
import { connectLogger, Ctx } from "@reatom/framework";
import { reatomContext, useCreateCtx, useUpdate } from '@reatom/npm-react'

interface ReatomContextProviderProps extends PropsWithChildren {
  extend?: (ctx: Ctx) => void
}

declare global {
  var DEVTOOLS: undefined | Devtools
}

async function loadDevtools(ctx: Ctx) {
  if (import.meta.env.DEV) {
    try {
      const { createDevtools } = await import('@reatom/devtools');
      console.info('Connecting Reatom DevTools...');

      globalThis.DEVTOOLS = createDevtools({ ctx });

      console.info('Reatom DevTools connected.');
    } catch (error) {
      globalThis.DEVTOOLS = undefined;
    }
  } else {
    globalThis.DEVTOOLS = undefined;
  }
}

const logger = (ctx: Ctx) => 
  typeof window !== 'undefined' && import.meta.env.DEV ? connectLogger(ctx) : undefined

const SyncDevtools = () => useUpdate(loadDevtools, [])
const SyncLogger = () => useUpdate(logger, [])

export function ReatomContextProvider({
  children, extend
}: ReatomContextProviderProps) {
  const ctx = useCreateCtx(extend);

  return (
    <reatomContext.Provider value={ctx}>
      <SyncDevtools />
      <SyncLogger/>
      {children}
    </reatomContext.Provider>
  );
}