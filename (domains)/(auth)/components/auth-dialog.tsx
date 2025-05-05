import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { reatomComponent, useAction } from "@reatom/npm-react";
import { AuthDialogForm } from "./auth-form";
import { authDialogAtom, openAuthDialogAction } from "../models/auth-dialog.model";

export const AuthDialog = reatomComponent(({ ctx }) => {
  const openAction = useAction(openAuthDialogAction)

  return (
    <Dialog open={ctx.spy(authDialogAtom)} onOpenChange={v => openAction(v)}>
      <DialogContent className="max-w-lg rounded-4xl p-8">
        <div className="flex flex-col items-center gap-6">
          <AuthDialogForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}, "AuthDialog")