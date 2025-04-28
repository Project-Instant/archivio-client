import { ActionItem } from "@/shared/components/action-item/action-item";
import { Link } from "@/shared/components/link/Link";
import { ReactNode } from "react";

export default function LayoutSettings({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start w-full gap-6 h-full py-6">
      <div className="flex flex-col w-1/4">
        <Link href="/settings/edit-profile">
          <ActionItem>
            <span className="font-semibold text-neutral-900">Изменить профиль</span>
          </ActionItem>
        </Link>
        <Link href="/settings/account">
          <ActionItem>
            <span className="font-semibold text-neutral-900">Управление аккаунтом</span>
          </ActionItem>
        </Link>
        <Link href="/settings/privacy">
          <ActionItem>
            <span className="font-semibold text-neutral-900">Конфиденциальность и данные</span>
          </ActionItem>
        </Link>
      </div>
      <div className="w-3/4">
        {children}
      </div>
    </div>
  )
}