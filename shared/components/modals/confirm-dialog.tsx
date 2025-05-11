import { Dialog } from "@/shared/ui/dialog";
import { atom } from "@reatom/core";
import { reatomComponent } from "@reatom/npm-react";
import { PropsWithChildren } from "react";

export const confirmDialogIsOpenAtom = atom(false, "confirmDialogIsOpen");

export const ConfirmDialog = reatomComponent<PropsWithChildren>(({ ctx, children }) => {
  return (
    <Dialog open={ctx.spy(confirmDialogIsOpenAtom)} onOpenChange={v => confirmDialogIsOpenAtom(ctx, v)}>
      {children}
    </Dialog>
  )
})