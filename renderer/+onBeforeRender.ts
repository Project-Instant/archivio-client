import type { OnBeforeRenderAsync } from 'vike/types';
import { currentUserAtom, getUser } from '@/(domains)/(auth)/models/user.model';
import { createCtx } from '@reatom/core';
import { snapshotAtom } from '@/shared/lib/utils/with-ssr';
import consola from 'consola';

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext) => {
  const ctx = createCtx()

  const { isAuth, statusCode } = pageContext

  const user = await getUser({ headers: pageContext.headers ?? undefined })
  currentUserAtom(ctx, user)

  const snapshot = ctx.get(snapshotAtom)

  import.meta.env.DEV && consola.info(`\nSnapshot: ${JSON.stringify(snapshot, null, 2)}\n`)

  return {
    pageContext: {
      isAuth,
      statusCode,
      snapshot
    },
  };
};