import { redirect } from 'vike/abort'
import { GuardAsync, PageContext } from 'vike/types'
 
export const guard: GuardAsync = async (pageContext: PageContext): ReturnType<GuardAsync> => {
  if (!pageContext.isAuth) {
    throw redirect('/auth')
  }
}