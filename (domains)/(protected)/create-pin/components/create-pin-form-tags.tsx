import { Input } from "@/shared/ui/input"
import { reatomComponent } from "@reatom/npm-react"
import { controlTagsAction, inputTagAtom, isValidTagsAtom, similarTagsResource, tagsAtom } from "../models/create-pin.model"
import { Skeleton } from "@/shared/ui/skeleton"
import { X } from "lucide-react"

const SelectedTags = reatomComponent(({ ctx }) => {
  const tags = ctx.spy(tagsAtom)
  if (!tags) return null;

  return (
    tags.map((selectedTag, idx) => (
      <div key={idx} className="flex items-center gap-2 px-2 py-0.5 invert bg-background rounded-md">
        <span className="text-base">{selectedTag}</span>
        <div
          onClick={() => controlTagsAction(ctx, selectedTag, "remove")}
          className="flex items-center justify-center p-1 hover:bg-muted rounded-lg cursor-pointer"
        >
          <X size={16} />
        </div>
      </div>
    ))
  )
}, 'SelectedTags')

const SearchedTagsList = reatomComponent(({ ctx }) => {
  const tags = ctx.spy(similarTagsResource.dataAtom)

  if (ctx.spy(similarTagsResource.statusesAtom).isPending) {
    return (
      <>
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </>
    )
  }

  return (
    tags?.map((tag, idx) => (
      <div
        key={idx}
        className="flex items-center cursor-pointer hover:bg-muted/60 rounded-lg px-2 py-1"
        onClick={() => controlTagsAction(ctx, tag, "add")}
      >
        <span className="font-semibold text-base">{tag}</span>
      </div>
    ))
  )
}, "SearchedTags")

const SearchedTags = reatomComponent(({ ctx }) => {
  return (ctx.spy(inputTagAtom).length >= 1 && ctx.spy(isValidTagsAtom)) && (
    <div className="flex flex-col gap-2 p-2 w-full border-2 border-muted rounded-lg">
      <span>Предполагаем, что вы ищете</span>
      <div className="flex flex-col gap-1 w-full h-full max-h-[200px] overflow-y-auto">
        <SearchedTagsList />
      </div>
    </div>
  )
})

const CreatePinFormInput = reatomComponent(({ ctx }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      controlTagsAction(ctx, ctx.get(inputTagAtom), "add");
      inputTagAtom.reset(ctx)
    }
  };

  return (
    <Input
      disabled={!ctx.spy(isValidTagsAtom)}
      value={ctx.spy(inputTagAtom)}
      onChange={e => inputTagAtom(ctx, e.target.value)}
      type="text"
      maxLength={128}
      onKeyDown={handleKeyDown}
      placeholder="Введите тег"
    />
  )
}, "CreatePinFormInput")

export const CreatePinFormTag = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <CreatePinFormInput />
      <div className="flex flex-wrap w-full gap-2">
        <SelectedTags />
      </div>
      <SearchedTags/>
    </div>
  )
}