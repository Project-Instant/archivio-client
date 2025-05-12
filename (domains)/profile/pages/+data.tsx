import { PageContextServer } from "vike/types";
import { Profile } from "../models/profile.model";
import { getUser } from "../queries/get-user";
import { useConfig } from 'vike-react/useConfig'
import { wrapTitle } from "@/shared/lib/helpers/wrap-title";

export type Data = Awaited<ReturnType<typeof data> & { data: Profile }>;

export async function data(pageContext: PageContextServer) {
  const config = useConfig()

  const data = await getUser(pageContext.routeParams.id)

  config({
    Head: <>
      {data.user.description && <meta name="description" content={data.user.description} />}
      {data.user.avatarUrl && <meta property="og:image" content={data.user.avatarUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://mvp.fasberry.su/${data.user.login}`} />
      <meta property="og:site_name" content={wrapTitle(data.user.login)} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:locale:alternate" content="en_US" />
    </>
  })

  return {
    id: pageContext.routeParams.id,
    title: data?.user.login ?? "Не найдено",
    data
  }
}