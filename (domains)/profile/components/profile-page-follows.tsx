import { reatomComponent } from "@reatom/npm-react"
import { profileAtom } from "../models/profile.model"
import { Card, CardContent } from "@/shared/ui/card"
import { Users } from "lucide-react"
import { Skeleton } from "@/shared/ui/skeleton"

export const ProfilePageFollows = reatomComponent(({ ctx }) => {
  if (!ctx.spy(profileAtom)) {
    return <Skeleton className="w-full h-24 md:w-[calc(33.33%-1rem)]" />
  }
  
  const follows = ctx.spy(profileAtom)?.following ?? 0

  return (
    <Card className="w-full md:w-[calc(33.33%-1rem)]">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full">
          <Users className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Подписок</p>
          <p className="text-2xl font-bold">{follows}</p>
        </div>
      </CardContent>
    </Card>
  )
}, "ProfilePageFollows")