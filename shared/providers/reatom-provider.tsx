// only client

import { PropsWithChildren } from "react";
import type { Devtools } from "@reatom/devtools";
import { Ctx } from "@reatom/framework";
import { reatomContext, useCreateCtx } from '@reatom/npm-react'

interface ReatomContextProviderProps extends PropsWithChildren {
	extend?: (ctx: Ctx) => void
}

declare global {
  var DEVTOOLS: undefined | Devtools
}

async function loadDevtools(ctx: Ctx) {
  if (import.meta.env.DEV) {
    const { createDevtools } = await import('@reatom/devtools')
  
    globalThis.DEVTOOLS = createDevtools({ ctx, initVisibility: true })
  } else {
    globalThis.DEVTOOLS = undefined
  }
}

export function ReatomContextProvider({ 
  children, extend 
}: ReatomContextProviderProps) {
  const ctx = useCreateCtx(async (ctx) => {
    extend?.(ctx);
    await loadDevtools(ctx);
  });

  return (
    <reatomContext.Provider value={ctx}>
      {children}
    </reatomContext.Provider>
  );
}