import { Separator } from "@/shared/ui/separator"
import { SheetClose } from "@/shared/ui/sheet"
import { Fragment } from "react/jsx-runtime"
import { ActionItem } from "@/shared/components/action-item/action-item"
import { Link } from "../../link/Link"

export const HEADER = [
  {
    section: "panel",
    title: "Быстрый доступ",
    children: [
      {
        title: "Лента",
        href: "/homefeed",
      },
      {
        title: "Бизнес-хаб",
        href: "/business",
      },
    ]
  },
  {
    section: "create-content",
    title: "Создание контента",
    children: [
      {
        title: "Создать пин",
        href: "/create-pin",
      },
      {
        title: "Создать коллекцию",
        href: "/create-collection",
      },
    ]
  },
  {
    section: "content",
    title: "Контент",
    children: [
      {
        title: "Исследовать",
        href: "/explore",
      },
    ]
  },
  {
    section: "effective",
    title: "Анализ эффективности",
    children: [
      {
        title: "Аналитика",
        href: "/analytics",
      }
    ]
  }
]

export function HeaderLinks() {
  return (
    <div className="container mx-auto h-full">
      <div className="flex flex-col lg:flex-row items-start justify-between h-full py-12 gap-2 w-full">
        {HEADER.map(i => (
          <Fragment key={i.section}>
            <div className="flex flex-col items-start text-foreground justify-start h-full gap-3 w-full">
              <p className="font-semibold text-lg">
                {i.title}
              </p>
              <div className="flex flex-col gap-2 h-full w-full">
                {i.children.map((j, idx) => (
                  <SheetClose key={idx}>
                    <Link href={j.href}>
                      <ActionItem>
                        {j.title}
                      </ActionItem>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
            <Separator orientation="vertical" className="h-full bg-muted" />
          </Fragment>
        ))}
      </div>
    </div>
  )
}