import { Link } from "@/shared/components/link/Link";
import { NotFoundTemplate } from "@/shared/components/templates/not-found-template";
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper";
import { Button } from "@/shared/ui/button";
import { usePageContext } from "vike-react/usePageContext";

const ErrorPage = () => {
  const { abortReason } = usePageContext();

  return (
    <>
      <h2 className="text-xl lg:text-2xl text-red-600 font-semibold">
        Произошла ошибка
      </h2>
      {/* @ts-ignore */}
      {import.meta.env.PROD && <span>{abortReason}</span>}
      <Link href="/">
        <Button variant="secondary" className="text-base invert font-semibold">
          Вернуться к ленте
        </Button>
      </Link>
    </>
  )
}

export default function Page() {
  const { is404 } = usePageContext()

  return (
    <ContainerWrapper>
      {is404 ? <NotFoundTemplate /> : <ErrorPage />}
    </ContainerWrapper>
  );
}