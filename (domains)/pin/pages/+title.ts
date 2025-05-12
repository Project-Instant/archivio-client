import type { PageContext } from 'vike/types'
import { wrapTitle } from '@/shared/lib/helpers/wrap-title'
import { Data } from './+data'
 
export default (pageContext: PageContext<Data>) => wrapTitle(pageContext.data.id)