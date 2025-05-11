import { guardAuthentication } from '@/(domains)/(auth)/queries/validate-authentication'
import { GuardAsync } from 'vike/types'

export const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
  return await guardAuthentication(pageContext)
}