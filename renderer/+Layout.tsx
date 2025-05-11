import { connectLogger, Ctx } from "@reatom/framework";
import { clientOnly } from 'vike-react/clientOnly'
import { Toaster } from "sonner";
import { useUpdate } from "@reatom/npm-react";
import { usePageContext } from "vike-react/usePageContext";
import { PropsWithChildren } from "react";
import { isAuthAtom } from "@/(domains)/(auth)/models/user.model";
import { AuthLayout } from "@/(domains)/(auth)/components/auth-layout";

import "@/shared/styles/style.css";

const ReatomContext = clientOnly(async () => (
  await import('@/shared/providers/reatom-provider')
).ReatomContextProvider);

const NextTopLoader = clientOnly(async () => (
  await import("nextjs-toploader")
).default)

function logger(ctx: Ctx) {
  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    connectLogger(ctx)
  }
}

const SyncIsAuth = () => useUpdate(isAuthAtom, [usePageContext().isAuth])

export default function LayoutDefault({ children }: PropsWithChildren) {
  return (
    <div id="page-container">
      <div id="page-content">
        <NextTopLoader
          color="#059669"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
            <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <ReatomContext extend={ctx => logger(ctx)}>
          <SyncIsAuth />
          <Toaster position="bottom-center" richColors />
          <AuthLayout>
            {children}
          </AuthLayout>
        </ReatomContext>
      </div>
    </div>
  )
}