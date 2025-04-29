import "@/shared/styles/style.css";
import "@/shared/styles/tailwind.css";

import { connectLogger, Ctx } from "@reatom/framework";
import { clientOnly } from 'vike-react/clientOnly'
import { Toaster } from "sonner";
import { useUpdate } from "@reatom/npm-react";
import { usePageContext } from "vike-react/usePageContext";
import { PropsWithChildren } from "react";
import { isAuthAtom } from "@/(domains)/(auth)/models/user.model";
import { AuthLayout } from "@/(domains)/(auth)/components/auth-layout/auth-layout";

const ReatomContext = clientOnly(async () => (
  await import('@/shared/providers/reatom-provider')
).ReatomContextProvider);

function logger(ctx: Ctx) {
  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    connectLogger(ctx)
  }
}

const Sync = () => useUpdate(isAuthAtom, [usePageContext().isAuth])

export default function LayoutDefault({ children }: PropsWithChildren) {
  return (
    <div id="page-container">
      <div id="page-content">
        <ReatomContext extend={ctx => logger(ctx)}>
          <Sync />
          <Toaster richColors />
          <AuthLayout>
            {children}
          </AuthLayout>
        </ReatomContext>
      </div>
    </div>
  )
}