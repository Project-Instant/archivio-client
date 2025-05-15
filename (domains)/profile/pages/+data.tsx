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
      <meta name="description" content={`Исследуйте пины и фотографии из путешествий от ${data.user.login}`} />
      <meta property="twitter:description" content={`Исследуйте пины и фотографии из путешествий от ${data.user.login}`} />
      {data.user.avatarUrl && <meta property="og:image" content={data.user.avatarUrl} />}
      {data.user.avatarUrl && <meta property="twitter:image" content={data.user.avatarUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://mvp.fasberry.su/u/${data.user.login}`} />
      <meta property="og:site_name" content={wrapTitle(data.user.login)} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://mvp.fasberry.su/u/${data.user.login}`} />
      <meta property="twitter:title" content={wrapTitle(data.user.login)} />
    </>
  })

  return {
    id: pageContext.routeParams.id,
    title: data?.user.login ?? "Не найдено",
    data
  }
}