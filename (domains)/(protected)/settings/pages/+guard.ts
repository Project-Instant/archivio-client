import { redirect } from 'vike/abort'
import { GuardAsync } from 'vike/types'

export const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
  if (!pageContext.isAuth) {
    throw redirect('/auth')
  }
  
  if (pageContext.urlPathname === "/settings") {
    throw redirect("/settings/edit-profile")
  }
}