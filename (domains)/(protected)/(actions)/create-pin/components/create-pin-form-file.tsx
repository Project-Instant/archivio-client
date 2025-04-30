import { reatomComponent, useAction } from "@reatom/npm-react"
import { deleteImageAction, imageUrlAtom, isRejectedAtom, isRejectedErrorAtom, MAX_FILE_SIZE, uploadImageAction } from "../models/create-pin.model"
import { cva, VariantProps } from "class-variance-authority"
import { HTMLAttributes, useRef } from "react"
import { isDraggedAtom } from "../models/file-area.model"
import { File, X } from "lucide-react"
import { bytesToMB } from "@/shared/lib/helpers/file-helpers"

type FileUploadAreProps = HTMLAttributes<HTMLDivElement>
  & VariantProps<typeof fileUploadAreaVariants>

const fileUploadAreaVariants = cva(`
  flex flex-col cursor-pointer overflow-hidden 
  items-center justify-center relative rounded-2xl w-1/4
`, {
  defaultVariants: {
    variant: "default",
    border: "dashed",
    layout: "default"
  },
  variants: {
    variant: {
      default: "bg-neutral-400/40",
      active: "bg-emerald-400/40",
      preview: "bg-transparent"
    },
    layout: {
      default: "h-2/3",
      preview: "h-auto max-h-4/5"
    },
    border: {
      default: "border-2 border-transparent",
      none: "border-none",
      dashed: "border-2 border-dashed border-neutral-400"
    }
  }
})

const FileUploadArea = ({ className, layout, variant, border, ...props }: FileUploadAreProps) => {
  return <div className={fileUploadAreaVariants({ layout, variant, border, className })} {...props} />
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
    <FileUploadArea className="group" layout="preview" border="none">
      <div
        onClick={deleteImage}
        className="group-hover:block absolute hidden right-2 top-2 
          bg-neutral-400 rounded-sm p-1"
      >
        <X size={20} />
      </div>
      <div className="flex items-end justify-center w-full h-full">
        <img
          src={ctx.spy(imageUrlAtom)}
          alt=""
          draggable={false}
          className="object-contain h-full w-full"
        />
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

export const CreatePinFileUploader = reatomComponent(({ ctx }) => {
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