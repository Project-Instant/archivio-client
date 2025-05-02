import { ActionItem } from "@/shared/components/action-item/action-item";
import { Link } from "@/shared/components/link/Link";
import { ContainerWrapper } from "@/shared/components/wrappers/container-wrapper";
import { ReactNode } from "react";

const SETTINGS_PAGES = [
  {
    title: "Изменить профиль",
    href: "/settings/edit-profile"
  },
  {
    title: "Управление аккаунтом",
    href: "/settings/account"
  },
  {
    title: "Конфиденциальность и данные",
    href: "/settings/privacy"
  },
  {
    title: "Персонализация",
    href: "/settings/appearance"
  }
]

const SettingsSidebar = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      {SETTINGS_PAGES.map((page, idx) => (
        <Link key={idx} href={page.href} className="group">
          <ActionItem className="group-data-[state=active]:bg-muted-foreground/20">
            <span className="font-semibold text-foreground">{page.title}</span>
          </ActionItem>
        </Link>
      ))}
    </div>
  )
}

export default function LayoutSettings({ children }: { children: ReactNode }) {
  return (
    <ContainerWrapper>
      <div className="flex items-start w-full gap-6 py-12 h-full">
        <div className="w-1/4">
          <SettingsSidebar />
        </div>
        <div className="w-3/4">
          {children}
        </div>
      </div>
    </ContainerWrapper>
  )
}