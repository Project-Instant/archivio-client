import { Link } from "@/shared/components/link/Link";
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <ContainerWrapper className="flex flex-col justify-center items-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-device-desktop-bolt"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14.5 16h-10.5a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v7.5" />
        <path d="M7 20h6" />
        <path d="M9 16v4" />
        <path d="M19 16l-2 3h4l-2 3" />
      </svg>
      <h2 className="text-xl lg:text-2xl font-semibold">
        Приложение временно недоступно
      </h2>
      <Link href="/explore">
        <Button variant="secondary" className="text-base invert font-semibold">
          Вернуться на главную
        </Button>
      </Link>
    </ContainerWrapper>
  )
}