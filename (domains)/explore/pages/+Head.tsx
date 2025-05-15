import { wrapTitle } from "@/shared/lib/helpers/wrap-title";

export default function Head() {
  return (
    <>
      <meta
        name="description"
        content="Откройте для себя тысячи потрясающих фотографий из путешествий, уникальные маршруты и идеи для вашего следующего приключения. Archivio - ваш гид в мир путешествий."
      />
      <link rel="canonical" href="https://mvp.fasberry.su/explore" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mvp.fasberry.su/explore" />
      <meta property="og:title" content={wrapTitle("Вдохновение для путешествий: фото, идеи, маршруты")} />
      <meta property="og:description" content="Откройте для себя тысячи потрясающих фотографий из путешествий и идеи для вашего следующего приключения на Archivio." />
      <meta property="og:image" content="https://images.unsplash.com/photo-1746555702228-5c4f5436d4b7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mvp.fasberry.su/explore" />
      <meta property="twitter:title" content={wrapTitle("Вдохновение для путешествий: фото, идеи, маршруты")} />
      <meta property="twitter:description" content="Откройте для себя тысячи потрясающих фотографий из путешествий и идеи для вашего следующего приключения на Archivio." />
      <meta property="twitter:image" content="https://images.unsplash.com/photo-1746555702228-5c4f5436d4b7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </>
  )
}