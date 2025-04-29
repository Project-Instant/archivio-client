import { PropsWithChildren } from "react"
import { reatomComponent } from "@reatom/npm-react"
import { Header, PublicHeader } from "@/shared/components/header/header"
import { AuthDialog } from "../auth-dialog/auth-dialog"
import { isAuthAtom } from "../../models/user.model"

export const AuthLayout = reatomComponent<PropsWithChildren>(({ ctx, children }) => {
  return (
    ctx.spy(isAuthAtom) ? (
      <>
        <Header />
        {children}
      </>
    ) : (
      <>
        <AuthDialog />
        <div className="flex flex-col relative min-h-svh w-full">
          <PublicHeader />
          {children}
        </div>
      </>
    )
  )
}, "AuthLayout")