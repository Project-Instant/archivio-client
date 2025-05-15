import { Button } from "@/shared/ui/button"
import { Link } from "../link/link"

export const FullscreenNotFound = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ContentNotFoundTemplate />
    </div>
  )
}

export const ContentNotFoundTemplate = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="icon icon-tabler icons-tabler-filled icon-tabler-square-rounded-x"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d={`M12 2l.324 .001l.318 .004l.616 .017l.299
             .013l.579 .034l.553 .046c4.785 .464 6.732
              2.411 7.196 7.196l.046 .553l.034 .579c.005
               .098 .01 .198 .013 .299l.017 .616l.005
                .642l-.005 .642l-.017 .616l-.013 .299l-.034
                 .579l-.046 .553c-.464 4.785 -2.411 6.732
                  -7.196 7.196l-.553 .046l-.579 .034c-.098 .005
                   -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642
                    -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785
                     -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1
                      -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004
                       -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732
                        7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616
                         -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218
                          1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293
                           -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083
                            -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094
                             -.083z`}
          fill="currentColor"
          strokeWidth="0"
        />
      </svg>
      <span className="font-semibold text-xl lg:text-2xl">Ничего не нашлось</span>
    </div>
  )
}

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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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