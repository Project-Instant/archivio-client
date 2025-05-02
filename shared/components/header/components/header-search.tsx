import { Input } from "@/shared/ui/input"
import { Sheet, SheetClose, SheetContent } from "@/shared/ui/sheet"
import { Skeleton } from "@/shared/ui/skeleton"
import { reatomComponent } from "@reatom/npm-react"
import { Search, X } from "lucide-react"
import { isSearchAtom, searchValueAtom } from "../models/header-search.model"

const SearchInput = reatomComponent(({ ctx }) => {
  return (
    <Input
      value={ctx.spy(searchValueAtom)}
      type="search"
      onChange={e => searchValueAtom(ctx, e.target.value)}
      placeholder="Поиск"
      aria-invalid={false}
      className="pl-12 rounded-full"
    />
  )
}, "SearchInput")

const SearchResult = reatomComponent(({ ctx }) => {
  if (!ctx.spy(searchValueAtom)) return null;

  return (
    <div className="grid grid-cols-3 gap-2 auto-rows-auto overflow-y-auto w-full h-full">
      <Skeleton className="w-full h-24" />
      <Skeleton className="w-full h-24" />
      <Skeleton className="w-full h-24" />
      <Skeleton className="w-full h-24" />
    </div>
  )
}, "SearchResult")

export const GlobalSearch = reatomComponent(({ ctx }) => {
  return (
    <Sheet open={ctx.spy(isSearchAtom)} onOpenChange={v => isSearchAtom(ctx, v)}>
      <SheetContent withClose={false} side="top" className="left-1/2 rounded-b-lg -translate-x-1/2 w-full mx-2 sm:w-2/3 lg:w-2/4">
        <div className="flex flex-col h-full gap-4 max-h-2/3 items-center justify-center w-full">
          <div className="flex items-center gap-2 relative w-full">
            <Search size={20} className="absolute left-4 text-muted-foreground" />
            <SearchInput />
            <SheetClose className="absolute right-2 flex rounded-full p-2 items-center cursor-pointer bg-muted-foreground/20 justify-center">
              <X size={18} className="text-foreground" />
            </SheetClose>
          </div>
          <SearchResult/>
        </div>
      </SheetContent>
    </Sheet>
  )
}, "GlobalSearch")

export const SearchTrigger = reatomComponent(({ ctx }) => {
  return (
    <div
      onClick={() => isSearchAtom(ctx, true)}
      className="flex items-center 
        justify-center hover:bg-muted-foreground/20 data-[state=open]:bg-muted-foreground/20 
        group cursor-pointer rounded-xl p-2"
    >
      <Search size={20} className='text-foreground' />
    </div>
  )
}, "SearchTrigger")