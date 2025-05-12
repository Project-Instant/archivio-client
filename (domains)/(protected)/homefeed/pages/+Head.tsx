import { wrapTitle } from "@/shared/lib/helpers/wrap-title";

export default function Head() {
  return (
    <>
      <meta name="description" content="Archivio - круто!" />
      <meta property="og:description" content="Archivio - круто!" />
      <meta property="og:image" content="https://images.unsplash.com/photo-1743623930275-abbb3ad3be0b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://mvp.fasberry.su/homefeed`} />
      <meta property="og:site_name" content={wrapTitle("Лента")} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:locale:alternate" content="en_US" />
    </>
  )
}