import { reatomComponent } from "@reatom/npm-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/dialog"
import { Button } from "@/shared/ui/button"
import { navigateToNonverifiedLinkAction, nonverifiedLinkDialogIsOpenAtom } from "./link.model"

export const NonregisteredLinkDialog = reatomComponent(({ ctx }) => {
  return (
    <Dialog open={ctx.spy(nonverifiedLinkDialogIsOpenAtom)} onOpenChange={v => nonverifiedLinkDialogIsOpenAtom(ctx, v)}>
      <DialogContent>
        <DialogTitle className="text-center">Переход по ссылке</DialogTitle>
        <DialogDescription>Вы точно хотите перейти по этой ссылке?</DialogDescription>
        <div className="flex items-center justify-end w-full gap-2">
          <DialogClose asChild>
            <Button variant="secondary">
              Отмена
            </Button>
          </DialogClose>
          <Button onClick={() => navigateToNonverifiedLinkAction(ctx)}>
            Перейти
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}, "NonregisteredLinkDialog")