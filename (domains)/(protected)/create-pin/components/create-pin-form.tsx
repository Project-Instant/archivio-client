import { CreatePinFormTitle } from "./create-pin-form-title"
import { CreatePinFormDescription } from "./create-pin-form-description"
import { CreatePinFormLink } from "./create-pin-form-link"
import { CreatePinFormCollection } from "./create-pin-form-collection"
import { CreatePinFormTag } from "./create-pin-form-tags"
import { reatomComponent } from "@reatom/npm-react"
import { imageUrlAtom, uploadPinAction } from "../models/create-pin.model"
import { CreatePinFileUploader } from "./create-pin-form-file"
import { Loader } from "@/shared/ui/loader"
import { Button } from "@/shared/ui/button"

export const CreatePinForm = reatomComponent(({ ctx }) => {
  const isDisabled = !ctx.spy(imageUrlAtom)
  const isPending = ctx.spy(uploadPinAction.statusesAtom).isPending

  return (
    <div
      data-status={isPending ? "creating" : "idle"}
      className="flex flex-col lg:flex-row items-start gap-x-10
        gap-y-8 lg:p-4 w-full xl:p-6 h-full justify-center group"
    >
      {isPending && (
        <div
          className="absolute z-[2] flex flex-col items-center bg-black/40 backdrop-blur-md 
            rounded-xl size-64 justify-center gap-6 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <Loader />
          <p className='font-semibold text-xl'>Создаем пин...</p>
          <Button onClick={() => uploadPinAction(ctx).controller.abort()}>
            Отмена
          </Button>
        </div>
      )}
      <CreatePinFileUploader />
      <div
        className="flex flex-col w-full lg:w-1/3 xl:w-1/4 h-fit 
          group-data-[status=creating]:opacity-50 group-data-[status=creating]:pointer-events-none gap-4 aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled={isDisabled}
      >
        <div className="flex flex-col gap-1">
          <p>Название</p>
          <CreatePinFormTitle />
        </div>
        <div className="flex flex-col gap-1">
          <p>Описание</p>
          <CreatePinFormDescription />
        </div>
        <div className="flex flex-col gap-1">
          <p>Ссылка</p>
          <CreatePinFormLink />
        </div>
        <div className="flex flex-col gap-1">
          <p>Коллекция</p>
          <CreatePinFormCollection />
        </div>
        <div className="flex flex-col gap-1">
          <p>Темы с тегом</p>
          <CreatePinFormTag />
        </div>
      </div>
    </div>
  )
}, "CreatePinForm")