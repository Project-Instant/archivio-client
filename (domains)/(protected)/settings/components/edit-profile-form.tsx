import { Input } from "@/shared/ui/input"
import { reatomComponent } from "@reatom/npm-react"
import { 
  applyChangesAction, 
  isChangesAtom, 
  MAX_DESCRIPTION_LENGTH, 
  MAX_NAME_LENGTH, 
  newAvatarAtom, 
  newDescriptionAtom, 
  newNameAtom, 
  resetAvatarAction 
} from "../models/edit-profile.model"
import { ReactNode, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Upload, X } from "lucide-react"
import { getCurrentUser } from "@/(domains)/(auth)/models/user.model"
import { Button } from "@/shared/ui/button"

export const EditName = reatomComponent(({ ctx }) => {
  return (
    <Input
      type="text"
      className="w-2/4"
      maxLength={MAX_NAME_LENGTH}
      placeholder="Введите имя"
      value={ctx.spy(newNameAtom) ?? ""}
      onChange={e => newNameAtom(ctx, e.target.value)}
    />
  )
})

export const EditDescription = reatomComponent(({ ctx }) => {
  return (
    <Input
      type="text"
      className="w-2/4"
      maxLength={MAX_DESCRIPTION_LENGTH}
      value={ctx.spy(newDescriptionAtom) ?? ""}
      onChange={e => newDescriptionAtom(ctx, e.target.value)}
      placeholder="Введите описание"
    />
  )
})

const ActionWrapper = ({ children, onClick }: { onClick: () => void, children: ReactNode }) => {
  return (
    <div
      className="absolute cursor-pointer z-[5] group-hover:flex hidden w-full h-full items-center justify-center"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export const EditAvatar = reatomComponent(({ ctx }) => {
  const currentUser = getCurrentUser(ctx, { throwError: false })
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
      ? e.target.files
        ? e.target.files[0]
        : null
      : null;

    if (file) {
      newAvatarAtom(ctx, URL.createObjectURL(file))
    }
  }

  if (!currentUser) return null;

  return (
    <div className="flex flex-col w-full">
      <p className="font-semibold text-lg">Аватар</p>
      <Avatar className="w-32 h-32 group">
        <AvatarImage src={ctx.spy(newAvatarAtom) ?? undefined} className="group-hover:brightness-50" alt="" />
        {ctx.spy(newAvatarAtom) && (
          <ActionWrapper onClick={() => resetAvatarAction(ctx)}>
            <X size={36} />
          </ActionWrapper>
        )}
        <AvatarFallback className="hover:brightness-150">
          <ActionWrapper onClick={() => inputRef.current?.click()}>
            <Upload size={36} />
          </ActionWrapper>
          <span className="text-xl group-hover:hidden">
            {currentUser.login[0].toUpperCase()}
          </span>
        </AvatarFallback>
        <input
          ref={inputRef}
          type="file"
          multiple={false}
          onChange={handleFileSelect}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </Avatar>
    </div>
  )
}, "EditAvatar")

export const EditProfileApply = reatomComponent(({ ctx }) => {
  return (
    <Button
      className="bg-emerald-600 hover:bg-emerald-700 w-fit px-4 text-lg font-semibold text-white"
      onClick={() => applyChangesAction(ctx)}
      disabled={!ctx.spy(isChangesAtom)}
    >
      Сохранить
    </Button>
  )
}, "ApplyChanges")