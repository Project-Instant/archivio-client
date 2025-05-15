import { Separator } from "@/shared/ui/separator"
import { SheetClose } from "@/shared/ui/sheet"
import { Fragment } from "react/jsx-runtime"
import { ActionItem } from "@/shared/components/action-item/action-item"
import { Link } from "../../link/link"

export const LINKS = [
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

const HeaderLink = ({ children, title }: Omit<typeof LINKS[number], "section">) => {
  return (
    <div className="flex flex-col items-start text-foreground justify-start h-full gap-3 w-full">
      <p className="font-semibold text-lg">
        {title}
      </p>
      <div className="flex flex-col gap-2 h-full w-full">
        {children.map((j, idx) => (
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
  )
}

export function HeaderLinks() {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between h-full py-12 gap-2 w-full">
      {LINKS.map(link => (
        <Fragment key={link.section}>
          <HeaderLink title={link.title} children={link.children} />
          <Separator orientation="vertical" className="h-full bg-muted" />
        </Fragment>
      ))}
    </div>
  )
}