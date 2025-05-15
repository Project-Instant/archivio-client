import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/dialog";
import { reatomComponent } from "@reatom/npm-react";
import { AuthForm } from "./auth-form";
import { authDialogIsOpenAtom } from "../models/auth-dialog.model";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const AuthDialog = reatomComponent(({ ctx }) => {
  return (
    <Dialog open={ctx.spy(authDialogIsOpenAtom)} onOpenChange={v => authDialogIsOpenAtom(ctx, v)}>
      <DialogContent className="max-w-lg rounded-xl overflow-hidden p-0">
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </VisuallyHidden>
        <div className="flex flex-col items-center gap-6">
          <AuthForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}, "AuthDialog")