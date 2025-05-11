import { guardAuthentication } from '@/(domains)/(auth)/queries/validate-authentication'
import { GuardAsync, PageContext } from 'vike/types'
 
export const guard: GuardAsync = async (pageContext: PageContext): ReturnType<GuardAsync> => {
  return await guardAuthentication(pageContext)
}