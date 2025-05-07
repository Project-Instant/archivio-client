import { Button } from "@/shared/ui/button"
import { Link } from "../link/Link"

export const NotFoundTemplate = () => {
  return (
    <>
      <div className="flex items-center rounded-xl bg-foreground/20 justify-center min-h-24 min-w-24 max-w-40 max-h-40 aspect-square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          className="text-foreground"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 8l4 -4" />
          <path d="M14 4l-10 10" />
          <path d="M4 20l16 -16" />
          <path d="M20 10l-10 10" />
          <path d="M20 16l-4 4" />
        </svg>
      </div>
      <h2 className="text-xl lg:text-2xl font-semibold">
        Такой страницы нет
      </h2>
      <Link href="/">
        <Button variant="secondary" className="text-base invert font-semibold">
          Вернуться к ленте
        </Button>
      </Link>
    </>
  )
}