import "@/shared/styles/style.css";

import { clientOnly } from 'vike-react/clientOnly'
import { Toaster } from "sonner";
import { useUpdate } from "@reatom/npm-react";
import { usePageContext } from "vike-react/usePageContext";
import { PropsWithChildren } from "react";
import { isAuthAtom } from "@/(domains)/(auth)/models/user.model";
import { AuthLayout } from "@/(domains)/(auth)/components/auth-layout";
import { Loader } from '@/shared/ui/loader';

const ReatomContext = clientOnly(async () => (await import('@/shared/providers/reatom-provider')).ReatomContextProvider);
const NextTopLoader = clientOnly(() => import("nextjs-toploader"))

const SyncIsAuth = () => useUpdate(isAuthAtom, [usePageContext().isAuth])

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
        <Toaster position="bottom-center" richColors />
        <NextTopLoader color="#059669" showSpinner={false} shadow="0 0 10px #2299DD,0 0 5px #2299DD" />
        <ReatomContext fallback={<PageSkeleton />}>
          <SyncIsAuth />
          <AuthLayout>
            {children}
          </AuthLayout>
        </ReatomContext>
      </div>
    </div>
  )
}