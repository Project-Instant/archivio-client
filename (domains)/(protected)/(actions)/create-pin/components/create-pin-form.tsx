import { CreatePinFormTitle } from "./create-pin-form-title"
import { CreatePinFormDescription } from "./create-pin-form-description"
import { CreatePinFormLink } from "./create-pin-form-link"
import { CreatePinFormCollection } from "./create-pin-form-collection"
import { CreatePinFormTag } from "./create-pin-form-tags"
import { reatomComponent } from "@reatom/npm-react"
import { imageUrlAtom } from "../models/create-pin.model"

export const CreatePinForm = reatomComponent(({ ctx }) => {
  const isDisabled = typeof ctx.spy(imageUrlAtom) === 'undefined';
  
  return (
    <div
      className="flex flex-col w-1/4 h-full gap-4 aria-disabled:pointer-events-none aria-disabled:opacity-50"
      aria-disabled={isDisabled}
    >
      <div className="flex flex-col gap-1">
        <p className="text-foreground">
          Название
        </p>
        <CreatePinFormTitle />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-foreground">
          Описание
        </p>
        <CreatePinFormDescription />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-foreground">
          Ссылка
        </p>
        <CreatePinFormLink />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-foreground">
          Коллекция
        </p>
        <CreatePinFormCollection />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-foreground">
          Темы с тегом
        </p>
        <CreatePinFormTag />
      </div>
    </div>
  )
}, "CreatePinForm")