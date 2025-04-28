import { redirect } from 'vike/abort'

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  throw redirect('/homefeed')
}