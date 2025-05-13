import { ApiResponse, experimentalClient } from "@/shared/api/api-client";
import { Link } from "@/shared/components/link/Link";
import { wrapLink } from "@/shared/lib/helpers/wrap-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton"
import { reatomResource, withCache, withDataAtom, withStatusesAtom } from "@reatom/async"
import { reatomComponent } from "@reatom/npm-react"
import { pinResource } from "../models/pin.model";

export type PinComment = {
  id: string,
  message: string,
  owner: {
    id: number,
    login: string,
    name: string | null,
    avatarUrl: string | null;
  },
  createdAt: Date,
  updatedAt: string | null;
}

async function request(param: string, signal: AbortSignal) {
  const res = await experimentalClient(`pin/${param}/get-comments`, { throwHttpErrors: false, signal })
  const json = await res.json<ApiResponse<PinComment[] | null>>()

  if (!res.ok || !json.isSuccess) {
    return null;
  }

  return json.data
}

const commentsResource = reatomResource(async (ctx) => {
  const currentPinId = ctx.spy(pinResource.dataAtom)?.id
  if (!currentPinId) return

  return await ctx.schedule( () => request(currentPinId, ctx.controller.signal))
}).pipe(withDataAtom([]), withCache(), withStatusesAtom())

const List = reatomComponent(({ ctx }) => {
  if (ctx.spy(commentsResource.statusesAtom).isPending) return (
    <>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </>
  )

  const comments = ctx.spy(commentsResource.dataAtom)
  if (!comments) return null

  return (
    comments.map(comment => (
      <div key={comment.id} className="flex items-center gap-3 w-full">
        <Link href={wrapLink(comment.owner.login, "user")} className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.owner.avatarUrl ?? undefined} />
            <AvatarFallback>
              {comment.owner.login[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-base font-semibold">{comment.owner.login}</p>
        </Link>
        <span className="text-base">
          {comment.message}
        </span>
      </div>
    ))
  )
})

export const PinComments = () => {
  return (
    <div className="flex flex-col gap-3 max-h-[120px] h-fit w-full overflow-hidden">
      <List />
    </div>
  )
}