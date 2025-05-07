import { Link } from "@/shared/components/link/Link";
import { wrapLink } from "@/shared/lib/wrap-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton"
import { reatomResource, withCache, withDataAtom, withStatusesAtom } from "@reatom/async"
import { sleep } from "@reatom/framework";
import { reatomComponent } from "@reatom/npm-react"

type Comment = {
  id: string,
  message: string,
  owner: {
    id: string,
    login: string,
    name: string | null,
    avatarUrl: string | null;
  },
  createdAt: Date,
  updatedAt: string | null;
}

const data: Comment[] = [
  {
    id: "1asdjk",
    createdAt: new Date(),
    message: "крутой пин",
    owner: {
      id: "asd91",
      avatarUrl: "https://images.unsplash.com/photo-1746309820600-4832cf957235?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      login: "pigi",
      name: null
    },
    updatedAt: null
  },
  {
    id: "asdsad1",
    createdAt: new Date(),
    message: "плохой пин",
    owner: {
      id: "askzja",
      avatarUrl: "https://images.unsplash.com/photo-1746311460525-31a29b35f4c6?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      login: "matvei",
      name: null
    },
    updatedAt: null
  }
]

const commentsResource = reatomResource(async (ctx) => {
  await sleep(300)

  return await ctx.schedule( () => {
    return data
  })
}).pipe(withDataAtom([]), withCache(), withStatusesAtom())

const List = reatomComponent(({ ctx }) => {
  if (ctx.spy(commentsResource.statusesAtom).isPending) return (
    <>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </>
  )

  return (
    ctx.spy(commentsResource.dataAtom).map(comment => (
      <div key={comment.id} className="flex items-center gap-3 w-full">
        <Link href={wrapLink(comment.owner.login, "user")} className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.owner.avatarUrl ?? undefined} />
            <AvatarFallback>
              {comment.owner.login}
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