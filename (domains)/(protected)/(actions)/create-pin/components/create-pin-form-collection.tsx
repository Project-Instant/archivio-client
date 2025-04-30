import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/select"
import { reatomComponent } from "@reatom/npm-react"
import { collectionAtom, fetchCollections } from "../models/create-pin.model"

const Collections = reatomComponent(({ ctx }) => {
  const collections = ctx.spy(fetchCollections.dataAtom)

  return (
    collections.map((collection, idx) => (
      <SelectItem key={idx} value={collection.id}>
        {collection.title}
      </SelectItem>
    ))
  )
}, "Collections")

export const CreatePinFormCollection = reatomComponent(({ ctx }) => {
  return (
    <Select onValueChange={(value) => collectionAtom(ctx, value)}>
      <SelectTrigger>
        {ctx.spy(collectionAtom) ? (
          <span className="text-neutral-900">
            {ctx.spy(collectionAtom)}
          </span>
        ) : (
          <span className="text-neutral-900">
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