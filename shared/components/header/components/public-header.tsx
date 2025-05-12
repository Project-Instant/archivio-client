import { Link } from "../../link/Link"
import { HeaderLogo } from "./header-logo"
import { HeaderUser } from "./header-user"

export const PublicHeader = () => {
  return (
    <div className="shrink-0 container flex items-center h-16 mx-auto gap-x-4">
      <Link href="/" className="flex items-center gap-2 grow">
        <HeaderLogo />
      </Link>
      <div className="flex items-center gap-4 font-semibold">
        <Link href="/explore">Исследовать</Link>
        <Link href="/business">Бизнес</Link>
        <Link href="/nature">Места</Link>
        <div className='flex items-center gap-2'>
          <HeaderUser />
        </div>
      </div>
    </div>
  )
}