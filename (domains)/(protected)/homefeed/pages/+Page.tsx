import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper"
import { HomefeedContent } from "../components/homefeed-content"

export default function HomefeedPage() {
  return (
    <ContainerWrapper>
      <h2 className="text-2xl text-center text-foreground font-bold mb-6">
        Для вас
      </h2>
      <HomefeedContent />
    </ContainerWrapper>
  )
}