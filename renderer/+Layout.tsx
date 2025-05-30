import "@/shared/styles/style.css";

import { clientOnly } from 'vike-react/clientOnly'
import { Toaster } from "sonner";
import { PropsWithChildren } from "react";
import { AuthLayout } from "@/(domains)/(auth)/components/auth-layout";
import { ReatomContextProvider } from "@/shared/providers/reatom-provider";
import { logImport } from "@/shared/lib/utils/log-import";

const NextTopLoader = clientOnly(() => {
  const component = import("nextjs-toploader").then(m => ({ default: m.default }))
  logImport("NextTopLoader", component)
  return component
})

export default function LayoutDefault({ children }: PropsWithChildren) {
  return (
    <div id="page-container">
      <div id="page-content">
        <NextTopLoader color="#059669" showSpinner={false} shadow="0 0 10px #2299DD,0 0 5px #2299DD" />
        <ReatomContextProvider>
          <Toaster position="bottom-center" richColors />
          <AuthLayout>
            {children}
          </AuthLayout>
        </ReatomContextProvider>
      </div>
    </div>
  )
}