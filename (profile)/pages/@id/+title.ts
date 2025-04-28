import type { PageContext } from 'vike/types'
import type { Data } from './+data'
import { wrapTitle } from '@/shared/lib/wrap-title'
 
export default (pageContext: PageContext<Data>) => wrapTitle(pageContext.data.id)