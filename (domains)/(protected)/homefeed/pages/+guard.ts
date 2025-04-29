import { redirect } from 'vike/abort'
import { PageContext } from 'vike/types'
 
export const guard = (pageContext: PageContext) => {
  if (!pageContext.isAuth) {
    throw redirect('/auth')
  }
}