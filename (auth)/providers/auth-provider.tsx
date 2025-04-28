import { PropsWithChildren } from "react"
import { userResource } from "../../(auth)/domain/user/user.model"
import { reatomComponent } from "@reatom/npm-react"

export const AuthProvider = reatomComponent<PropsWithChildren>(({ ctx, children }) => {
  const _ = ctx.spy(userResource.dataAtom)

  return children
}, "AuthProvider")