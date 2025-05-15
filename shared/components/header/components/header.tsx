import { reatomComponent } from "@reatom/npm-react";
import { getCurrentUser } from "@/(domains)/(auth)/models/user.model";
import { Skeleton } from "@/shared/ui/skeleton";
import { lazy, PropsWithChildren, Suspense } from "react";
import { logImport } from "@/shared/lib/utils/log-import";

const PublicHeader = lazy(() => {
  const component = import("./public-header").then(m => ({ default: m.PublicHeader }))
  logImport("PublicHeader", component)
  return component
})

const ProtectedHeader = lazy(() => {
  const component = import("./protected-header").then(m => ({ default: m.ProtectedHeader }))
  logImport("ProtectedHeader", component)
  return component
})

const HeaderSkeleton = () => {
  return (
    <>
      <div className="flex items-center gap-2 grow">
        <Skeleton className="h-9 w-16" />
      </div>
      <>
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </>
    </>
  )
}

const HeaderWrapper = ({ children }: PropsWithChildren) => {
  return (
    <header className="sticky bg-background top-0 z-10 h-16">
      <div className="container h-full flex items-center mx-auto gap-x-4">
        {children}
      </div>
    </header>
  )
}

const HeaderChild = reatomComponent(({ ctx }) => {
  const currentUser = getCurrentUser(ctx)

  return !currentUser ? <PublicHeader /> : <ProtectedHeader />
}, "Header")

export const Header = () => {
  return (
    <HeaderWrapper>
      <Suspense fallback={<HeaderSkeleton />}> 
        <HeaderChild />
      </Suspense>
    </HeaderWrapper>
  )
}