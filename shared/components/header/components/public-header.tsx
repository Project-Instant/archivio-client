import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/shared/ui/sheet"
import { Link } from "../../link/Link"
import { HeaderLogo } from "./header-logo"
import { HeaderUser } from "./header-user"
import { Fragment } from "react/jsx-runtime"

export const LINKS = [
  {
    title: "Исследовать",
    child: function () {
      return <Link
        href="/explore"
        className="flex items-center duration-150 hover:bg-muted/60 rounded-lg p-2"
      >
        {this.title}
      </Link>
    }
  },
  {
    title: "Бизнес",
    href: "/for-business",
    child: function () {
      return (
        <Link
          href={this.href}
          className="flex items-center duration-150 hover:bg-muted/60 rounded-lg p-2"
        >
          {this.title}
        </Link>
      )
    }
  },
  {
    title: "Места",
    href: "/locations",
    child: function () {
      return (
        <Link
          href={this.href}
          className="flex items-center duration-150 hover:bg-muted/60 rounded-lg p-2"
        >
          {this.title}
        </Link>
      )
    }
  },
  {
    title: null,
    href: null,
    child: function () {
      return (
        <div className='flex items-center self-end gap-2' >
          <HeaderUser />
        </div >
      )
    }
  }
]

const Logo = () => {
  return (
    <div className="grow">
      <Link href="/" className="flex items-center gap-2 w-fit">
        <HeaderLogo />
      </Link>
    </div>
  )
}

export const PublicHeader = () => {
  return (
    <>
      <Logo />
      <div className="flex items-center md:hidden font-semibold">
        <Sheet>
          <SheetTrigger className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </SheetTrigger>
          <SheetContent withClose={false} side="top">
            <SheetTitle></SheetTitle>
            <div className="flex flex-col gap-4">
              <Logo />
              <div className='flex flex-col gap-2'>
                {LINKS.map(item => (
                  <SheetClose asChild key={item.title}>
                    {item.child()}
                  </SheetClose>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex items-center gap-4 font-semibold">
        {LINKS.map(item => (
          <Fragment key={item.title}>
            {item.child()}
          </Fragment>
        ))}
      </div>
    </>
  )
}