import "@/shared/styles/style.css";

import { clientOnly } from 'vike-react/clientOnly'
import { Toaster } from "sonner";
import { useUpdate } from "@reatom/npm-react";
import { usePageContext } from "vike-react/usePageContext";
import { PropsWithChildren } from "react";
import { pageContextAtom } from "@/(domains)/(auth)/models/user.model";
import { AuthLayout } from "@/(domains)/(auth)/components/auth-layout";
import { Loader } from '@/shared/ui/loader';

const ReatomContext = clientOnly(async () => (await import('@/shared/providers/reatom-provider')).ReatomContextProvider);
const NextTopLoader = clientOnly(() => import("nextjs-toploader"))

const SyncPageContext = () => {
  const { isAuth, isBackwardNavigation, isPageContext } = usePageContext()

  useUpdate((ctx) => pageContextAtom(ctx, { 
    isAuth, isBackwardNavigation, isPageContext
   }), [usePageContext().isAuth, usePageContext().isBackwardNavigation, usePageContext().isPageContext])

  return null;
}

const PageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 h-svh items-center justify-center">
      <span className="font-semibold text-xl">Archivio</span>
      <Loader />
    </div>
  )
}

export default function LayoutDefault({ children }: PropsWithChildren) {
  return (
    <div id="page-container">
      <div id="page-content">
        <NextTopLoader color="#059669" showSpinner={false} shadow="0 0 10px #2299DD,0 0 5px #2299DD" />
        <ReatomContext fallback={<PageSkeleton />}>
          <Toaster position="bottom-center" richColors />
          <SyncPageContext />
          <AuthLayout>
            {children}
          </AuthLayout>
        </ReatomContext>
      </div>
    </div>
  )
}