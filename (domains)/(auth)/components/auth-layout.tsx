import { lazy, Suspense, PropsWithChildren } from "react"
import { reatomComponent } from "@reatom/npm-react"
import { isAuthAtom } from "../models/user.model"
import { Header } from "@/shared/components/header/components/header"
import { logImport } from "@/shared/lib/utils/log-import"

const AuthDialog = lazy(() => {
  const component = import("./auth-dialog").then(m => ({ default: m.AuthDialog }))
  logImport("AuthDialog", component)
  return component
})

export const AuthLayout = reatomComponent<PropsWithChildren>(({ ctx, children }) => {
  return (
    <>
      {!ctx.spy(isAuthAtom) && <Suspense><AuthDialog /></Suspense>}
      <Header />
      {children}
    </>
  )
}, "AuthLayout")