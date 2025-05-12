import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { reatomComponent } from "@reatom/npm-react";
import { AuthDialogForm } from "./auth-form";
import { authDialogAtom } from "../models/auth-dialog.model";

export const AuthDialog = reatomComponent(({ ctx }) => {
  return (
    <Dialog open={ctx.spy(authDialogAtom)} onOpenChange={v => authDialogAtom(ctx, v)}>
      <DialogContent className="max-w-lg rounded-4xl p-8">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col items-center gap-6">
          <AuthDialogForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}, "AuthDialog")