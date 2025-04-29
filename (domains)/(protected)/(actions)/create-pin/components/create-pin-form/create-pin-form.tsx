import { bytesToMB } from "@/shared/lib/helpers/file-helpers"
import { Input } from "@/shared/ui/input"
import { reatomComponent, useAction } from "@reatom/npm-react"
import { cva, VariantProps } from "class-variance-authority"
import { File, X } from "lucide-react"
import { HTMLAttributes, useRef } from "react"
import {
  collectionAtom, deleteImageAction, descriptionAtom, fetchCollections,
  imageMetaAtom, imageUrlAtom, isRejectedAtom,
  isRejectedErrorAtom, linkAtom, MAX_FILE_SIZE, tagAtom, titleAtom, uploadImageAction
} from "../../models/create-pin.model"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/select"
import { isDraggedAtom } from "../../models/file-area.model"

type FileUploadAreProps = HTMLAttributes<HTMLDivElement>
  & VariantProps<typeof fileUploadAreaVariants>

const fileUploadAreaVariants = cva(`
  flex flex-col cursor-pointer border-2 overflow-hidden 
  items-center justify-center relative h-2/3 rounded-2xl w-1/4
`, {
  defaultVariants: {
    variant: "default",
    border: "dashed"
  },
  variants: {
    variant: {
      default: "bg-neutral-400/40",
      active: "bg-emerald-400/40"
    },
    border: {
      default: "border-transparent",
      dashed: "border-dashed border-neutral-400"
    }
  }
})

const FileUploadArea = ({ className, variant, border, ...props }: FileUploadAreProps) => {
  return <div className={fileUploadAreaVariants({ variant, border, className })} {...props} />
}

const CreatePinFileWarning = reatomComponent(({ ctx }) => {
  return (
    <FileUploadArea>
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
        <X size={46} className="text-red-500 animate-pulse" />
        <span className="text-red-500 text-base text-center">
          {ctx.spy(isRejectedErrorAtom)}
        </span>
      </div>
    </FileUploadArea>
  )
}, "CreatePinFileWarning")

const CreatePinFilePreview = reatomComponent(({ ctx }) => {
  const deleteImage = useAction(deleteImageAction)

  return (
    <FileUploadArea
      className="group"
      style={{
        height: ctx.spy(imageMetaAtom) ? ctx.spy(imageMetaAtom)!.height / 2 : undefined,
        width: ctx.spy(imageMetaAtom) ? ctx.spy(imageMetaAtom)!.width / 2 : undefined
      }}
    >
      <div
        onClick={deleteImage}
        className="group-hover:block absolute hidden right-2 top-2 
          bg-neutral-400 rounded-sm p-1"
      >
        <X size={20} />
      </div>
      <div className="flex items-end h-full w-full justify-center">
        <img src={ctx.spy(imageUrlAtom)} alt="" className="w-full h-full" />
      </div>
    </FileUploadArea>
  )
}, "CreatePinFilePreview")

const CreatePinFileUploadHandler = reatomComponent(({ ctx }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadImage = useAction(uploadImageAction)

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      uploadImage(Array.from(e.target.files)[0])
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggedAtom(ctx, false)

    const isLinkDrop = Array
      .from(e.dataTransfer.types)
      .includes('text/uri-list');

    if (isLinkDrop) return;

    if (e.dataTransfer.files) {
      uploadImage(Array.from(e.dataTransfer.files)[0])
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    isDraggedAtom(ctx, true)
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggedAtom(ctx, false)
  };

  return (
    <FileUploadArea
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      variant={ctx.spy(isDraggedAtom) ? "active" : "default"}
    >
      <div className="flex items-end h-2/4 w-full justify-center">
        <div className="flex items-center justify-center rounded-full bg-neutral-900 p-4">
          <File size={36} className="text-neutral-100" />
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple={false}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col p-6 h-2/4 items-center justify-between w-full">
        <span className="text-neutral-900 text-base">
          Выберите файл или перетащите его сюда
        </span>
        <span className="text-neutral-900 text-center text-sm">
          Рекомендуем использовать файлы высокого качества в формате .jpg
          (размером меньше {bytesToMB(MAX_FILE_SIZE)} MB)
        </span>
      </div>
    </FileUploadArea>
  )
}, "CreatePinFileUploadHandler")

const CreatePinFileUploader = reatomComponent(({ ctx }) => {
  if (ctx.spy(isRejectedAtom)) {
    return <CreatePinFileWarning />
  }

  switch (!!ctx.spy(imageUrlAtom)) {
    case true:
      return <CreatePinFilePreview />
    case false:
      return <CreatePinFileUploadHandler />
  }
}, "CreatePinFileUploader")

const CreatePinFormTitle = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(titleAtom)}
      placeholder="Добавьте название"
      onChange={(e) => titleAtom(ctx, e.target.value)}
    />
  )
}, "CreatePinFormTitle")

const CreatePinFormDescription = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(descriptionAtom)}
      placeholder="Добавьте подробное описание"
      onChange={(e) => descriptionAtom(ctx, e.target.value)}
    />
  )
}, "CreatePinFormDescription")

const CreatePinFormLink = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(linkAtom)}
      placeholder="Добавьте ссылку"
      onChange={(e) => linkAtom(ctx, e.target.value)}
    />
  )
}, "CreatePinFormLink")

const Collections = reatomComponent(({ ctx }) => {
  const collections = ctx.spy(fetchCollections.dataAtom)

  return (
    collections.map((collection, idx) => (
      <SelectItem key={idx} value={collection.id}>
        {collection.title}
      </SelectItem>
    ))
  )
}, "Collections")

const CreatePinFormCollection = reatomComponent(({ ctx }) => {
  return (
    <Select onValueChange={(value) => collectionAtom(ctx, value)}>
      <SelectTrigger>
        {ctx.spy(collectionAtom) ? (
          <span className="text-neutral-900">
            {ctx.spy(collectionAtom)}
          </span>
        ) : (
          <span className="text-neutral-900">
            Выберите коллекцию
          </span>
        )}
      </SelectTrigger>
      <SelectContent>
        <Collections />
      </SelectContent>
    </Select >
  )
}, "CreatePinFormCollection")

const CreatePinFormTag = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(tagAtom)}
      onChange={e => tagAtom(ctx, e.target.value)}
      type="text"
      placeholder="Найдите тег"
    />
  )
}, "CreatePinFormTag")

export const CreatePinForm = () => {
  return (
    <div className="flex items-start gap-8 w-full p-6 h-full justify-center">
      <CreatePinFileUploader />
      <div className="flex flex-col w-1/4 h-full gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-neutral-900">
            Название
          </p>
          <CreatePinFormTitle />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-neutral-900">
            Описание
          </p>
          <CreatePinFormDescription />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-neutral-900">
            Ссылка
          </p>
          <CreatePinFormLink />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-neutral-900">
            Коллекция
          </p>
          <CreatePinFormCollection />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-neutral-900">
            Темы с тегом
          </p>
          <CreatePinFormTag />
        </div>
      </div>
    </div>
  )
}