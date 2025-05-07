import { NotFoundTemplate } from "@/shared/components/templates/not-found-template";
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper";

export default function NotFound() {
  return (
    <ContainerWrapper className="flex flex-col justify-center items-center gap-4">
      <NotFoundTemplate />
    </ContainerWrapper>
  )
}