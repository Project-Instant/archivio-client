import { lazy, Suspense, PropsWithChildren } from "react"
import { reatomComponent } from "@reatom/npm-react"
import { Header } from "@/shared/components/header/components/header"
import { isAuthAtom } from "../models/user.model"
import { PublicHeader } from "@/shared/components/header/components/public-header"

const AuthDialog = lazy(() => import("./auth-dialog").then(m => ({ default: m.AuthDialog })))

export const AuthLayout = reatomComponent<PropsWithChildren>(({ ctx, children }) => {
  return ctx.spy(isAuthAtom) ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <>
      <Suspense>
        <AuthDialog />
      </Suspense>
      <div className="flex flex-col relative min-h-svh w-full">
        <PublicHeader />
        {children}
      </div>
    </>
  )
}, "AuthLayout")