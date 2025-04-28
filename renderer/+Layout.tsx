import { Header } from "@/shared/components/header/header";
import { connectLogger } from "@reatom/framework";
import { clientOnly } from 'vike-react/clientOnly'

import "@/shared/styles/style.css";
import "@/shared/styles/tailwind.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/(auth)/providers/auth-provider";

type LayoutProps = {
  children: React.ReactNode
}

const ReatomContext = clientOnly(() => import('@/shared/providers/reatom-provider')
  .then(m => m.ReatomContextProvider)
);

const ReatomContextProvider = ({ children }: LayoutProps) => {
  return (
    <ReatomContext
      extend={ctx => {
        if (typeof window !== 'undefined') {
          if (process.env.NODE_ENV === 'development') connectLogger(ctx)
        }
      }}
    >
      {children}
    </ReatomContext>
  )
}

export default function LayoutDefault({ children }: LayoutProps) {
  return (
    <div id="page-container">
      <div id="page-content" className="pb-12 min-h-screen">
        <div className="container px-4 mx-auto min-h-screen">
          <ReatomContextProvider>
            <AuthProvider>
              <Toaster
                richColors
              />
              <Header />
              {children}
            </AuthProvider>
          </ReatomContextProvider>
        </div>
      </div>
    </div>
  )
}