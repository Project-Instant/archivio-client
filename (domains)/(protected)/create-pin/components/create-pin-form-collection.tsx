import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/select"
import { reatomComponent } from "@reatom/npm-react"
import { collectionAtom, fetchCollections } from "../models/create-pin.model"
import { CloudDrizzleIcon } from "lucide-react"

const Collections = reatomComponent(({ ctx }) => {
  const collections = ctx.spy(fetchCollections.dataAtom)
  if (!collections) return null;

  return (
    collections.map((collection, idx) => (
      <SelectItem
        key={idx}
        value={collection.id}
        className="flex gap-4 p-2 items-center bg-secondary/50 rounded-lg"
      >
        <CloudDrizzleIcon size={20} />
        <div className="flex flex-col items-start">
          <p className="text-base font-semibold">{collection.title}</p>
          <span className="text-sm">0</span>
        </div>
      </SelectItem>
    ))
  )
}, "Collections")

export const CreatePinFormCollection = reatomComponent(({ ctx }) => {
  return (
    <Select onValueChange={(value) => collectionAtom(ctx, [value])}>
      <SelectTrigger className="w-full bg-input">
        {ctx.spy(collectionAtom) ? (
          <span className="text-foreground">
            {ctx.spy(collectionAtom)}
          </span>
        ) : (
          <span className="text-foreground">
            Выберите коллекцию
          </span>
        )}
      </SelectTrigger>
      <SelectContent>
        <Collections />
      </SelectContent>
    </Select >
  )
}, "CreatePinFormCollection")