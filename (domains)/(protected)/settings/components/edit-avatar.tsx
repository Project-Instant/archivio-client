import { currentUserAtom } from "@/(domains)/(auth)/models/user.model";
import { reatomComponent } from "@reatom/npm-react";
import { ReactNode, useRef } from "react";
import { newAvatarAtom, resetAvatarAction } from "../models/edit-profile.model";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Upload, X } from "lucide-react";

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

  return (
    <div className="flex flex-col w-full">
      <p className="font-semibold text-lg">Аватар</p>
      <Avatar className="w-32 h-32 group">
        <AvatarImage src={ctx.spy(newAvatarAtom) ?? undefined} className="group-hover:brightness-50" />
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
            {ctx.spy(currentUserAtom)?.login[0].toUpperCase()}
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