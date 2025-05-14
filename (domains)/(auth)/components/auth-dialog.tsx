import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/dialog";
import { reatomComponent } from "@reatom/npm-react";
import { AuthDialogForm } from "./auth-form";
import { authDialogIsOpenAtom } from "../models/auth-dialog.model";

export const AuthDialog = reatomComponent(({ ctx }) => {
  return (
    <Dialog open={ctx.spy(authDialogIsOpenAtom)} onOpenChange={v => authDialogIsOpenAtom(ctx, v)}>
      <DialogContent className="max-w-lg rounded-4xl p-8">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="flex flex-col items-center gap-6">
          <AuthDialogForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}, "AuthDialog")