import { reatomComponent } from "@reatom/npm-react";
import { profileUserAtom } from "../models/profile.model";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/ru"

type ProfileDescriptionProps = {
  description: string
}

export const ProfileDescription = ({ description }: ProfileDescriptionProps) => {
  return (
    <p className="text-lg text-muted-foreground">
      {description}
    </p>
  )
}

type ProfileCreatedAtProps = {
  createdAt: Date
}

export const ProfileCreatedAt = ({ createdAt }: ProfileCreatedAtProps) => {
  const formatted = dayjs(createdAt).locale("ru").format(`С MMM YYYY`)

  return (
    <div className="flex items-center gap-1">
      <Calendar size={16} />
      <span className="text-muted-foreground">{formatted}</span>
    </div>
  )
}

export const ProfileAbout = reatomComponent(({ ctx }) => {
  const profileUser = ctx.spy(profileUserAtom)
  if (!profileUser) return null;

  return (
    <>
      {profileUser.description && <ProfileDescription description={profileUser.description} />}
      <div className="flex items-center gap-2">
        <ProfileCreatedAt createdAt={profileUser.createdAt} />
      </div>
    </>
  )
}, "ProfileAbout")