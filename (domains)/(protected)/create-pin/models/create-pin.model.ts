import { client } from "@/shared/api/api-client";
import { bytesToMB, getImageDimensions } from "@/shared/lib/helpers/file-helpers"
import {
  action, atom, reatomAsync, reatomResource,
  sleep, withAbort, withCache, withComputed, withDataAtom,
  withErrorAtom, withReset, withRetry, withStatusesAtom
} from "@reatom/framework"
import * as S from "sury"
import { Encoder } from 'cbor-x'
import { validateString } from "@/shared/lib/helpers/validate-string";
import { toast } from "sonner";

type ImageMeta = S.Output<typeof createPinSchema>["fileMeta"];

type Collection = {
  id: string;
  title: string;
  tags: string[];
};

export const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_IMAGE_WIDTH = 4096;
const MAX_IMAGE_HEIGHT = 4096;

export const MAX_TITLE_LENGTH = 200;
export const MAX_DESCRIPTION_LENGTH = 1000;
export const MAX_LINK_LENGTH = 200;
export const MAX_TAGS_LENGTH = 16;
export const MAX_COLLECTIONS_LENGTH = 3;

let encoder = new Encoder();

const createPinSchema = S.schema({
  title: S.string.with(S.min, 2).with(S.max, 200),
  description: S.nullable(
    S.string.with(S.min, 2).with(S.max, MAX_DESCRIPTION_LENGTH)
  ),
  link: S.nullable(
    S.url(S.string).with(S.max, MAX_LINK_LENGTH)
  ),
  collection: S.nullable(
    S.array(
      S.string
    ).with(S.min, 1).with(S.max, MAX_COLLECTIONS_LENGTH)
  ),
  tags: S.array(
    S.string
  ).with(S.max, MAX_TAGS_LENGTH),
  location: S.nullable(
    S.string
  ),
  imageUrl: S.string,
  fileMeta: S.schema({
    width: S.number,
    height: S.number,
    type: S.string,
    rawFilename: S.nullish(S.string)
  }),
})

export const imageUrlAtom = atom<string | null>(null, "imageUlrAtom").pipe(withReset())
export const imageMetaAtom = atom<ImageMeta | null>(null, "imageMetaAtom").pipe(withReset())

export const titleAtom = atom<string | null>(null, "titleAtom").pipe(withReset())
export const descriptionAtom = atom<string | null>(null, "descriptionAtom").pipe(withReset())
export const linkAtom = atom<string | null>(null, "linkAtom").pipe(withReset())
export const collectionAtom = atom<string[] | null>(null, "collectionAtom").pipe(withReset())
export const tagsAtom = atom<string[]>([], "tagsAtom").pipe(withReset())
export const locationAtom = atom<string | null>(null, "locationAtom").pipe(withReset())

export const inputTagAtom = atom("", "inputTagAtom").pipe(withReset())
export const isValidTagsAtom = atom<boolean>((ctx) => ctx.spy(tagsAtom).length < MAX_TAGS_LENGTH, "isValidTagsAtom")

export const similarTagsResource = reatomResource(async (ctx) => {
  if (!ctx.spy(isValidTagsAtom)) return;

  const value = ctx.spy(inputTagAtom)

  await sleep(15)

  return await ctx.schedule(() => ["abc", "bca", "cba", "cab", "abc", "bca", "cba", "cab"])
}).pipe(withDataAtom(), withCache(), withStatusesAtom())

export const controlTagsAction = action((ctx, value: string, type: "add" | "remove") => {
  if (!value || value.length <= 1) return;

  switch (type) {
    case "add":
      return tagsAtom(ctx, (state) => {
        if (state.length >= MAX_TAGS_LENGTH) {
          return state;
        }

        return [...state, value]
      })
    case "remove":
      return tagsAtom(ctx, (state) => state.filter(i => i !== value))
  }
})

export const isValidAtom = atom<boolean>((ctx) => {
  const result = S.safe(() => S.parseOrThrow({
    title: validateString(ctx.spy(titleAtom)),
    description: validateString(ctx.spy(descriptionAtom)),
    link: validateString(ctx.spy(linkAtom)),
    collection: ctx.spy(collectionAtom),
    tags: ctx.spy(tagsAtom),
    location: validateString(ctx.spy(locationAtom)),
    imageUrl: ctx.spy(imageUrlAtom),
    fileMeta: ctx.spy(imageMetaAtom),
  }, createPinSchema))

  return result.success === true;
}, "isValidAtom")

export const isRejectedErrorAtom = atom<string>("", "isRejectedErrorAtom").pipe(withReset())
export const isRejectedAtom = atom<boolean>(false, "isRejectedAtom").pipe(
  withReset(),
  withComputed((ctx, state) => {
    if (state === true) resetErrorAction(ctx, true)
    return state
  }),
)

export const resetErrorAction = action(async (ctx, isLazy: boolean) => {
  if (isLazy) await sleep(2000);

  isRejectedAtom.reset(ctx)
  isRejectedErrorAtom.reset(ctx)
})

export const deleteImageAction = action((ctx) => {
  const url = ctx.get(imageUrlAtom)

  if (url) {
    URL.revokeObjectURL(url)
  }

  imageUrlAtom.reset(ctx)
  imageMetaAtom.reset(ctx)
})

async function validateFileSize(target: File) {
  const currentBytes = target.size;

  if (currentBytes > MAX_FILE_SIZE) {
    throw new Error(`Размер файла превышает ${bytesToMB(MAX_FILE_SIZE)} MB`)
  }
}

export const uploadImageAction = reatomAsync(async (ctx, target: File) => {
  return await ctx.schedule(async () => {
    await validateFileSize(target)

    const { height, width } = await getImageDimensions(target)

    imageUrlAtom(ctx, URL.createObjectURL(target))
    imageMetaAtom(ctx, {
      width, height,
      type: target.type,
      rawFilename: target.name.length ? target.name : null,
    })
  })
}, {
  onReject(ctx, e) {
    if (e instanceof Error) {
      isRejectedAtom(ctx, true)
      isRejectedErrorAtom(ctx, e.message)
    }
  }
}).pipe(withStatusesAtom())

export const uploadPinAction = reatomAsync(async (ctx) => {
  if (!ctx.get(isValidAtom)) return;

  const meta = {
    title: ctx.get(titleAtom),
    description: ctx.get(descriptionAtom),
    link: ctx.get(linkAtom),
    collection: ctx.get(collectionAtom),
    tags: ctx.get(tagsAtom),
    location: ctx.get(locationAtom),
    file: ctx.get(imageMetaAtom),
  };

  const fileUrl = ctx.get(imageUrlAtom);

  if (!fileUrl || !meta) return;

  const fileBlob = await fetch(fileUrl).then(res => res.blob());
  const fileArrayBuffer = await fileBlob.arrayBuffer();

  if (!fileArrayBuffer) return;

  const fileUint8Array = new Uint8Array(fileArrayBuffer);

  const payload = { meta, file: fileUint8Array }
  const payloadEncoded = encoder.encode(payload);
  console.log(payload, payloadEncoded)

  await sleep(1000)

  const res = await client.post('pin/create-pin', { body: payloadEncoded })

  console.log(res.ok, res.status)
}, {
  name: "uploadPinAction",
  onReject(ctx, e) {
    if (e instanceof Error) {
      toast.error(e.message)
    }
  },
  onFulfill(ctx) {
    titleAtom.reset(ctx)
    descriptionAtom.reset(ctx)
    linkAtom.reset(ctx)
    collectionAtom.reset(ctx)
    tagsAtom.reset(ctx)
    locationAtom.reset(ctx)
    deleteImageAction(ctx)
    toast.success("Пин создан")
  }
}).pipe(withStatusesAtom(), withAbort())

async function getCollections(...params: Parameters<typeof fetch>): Promise<Array<Collection>> {
  return [
    { id: "1", title: "Default Collection", tags: ["Nature"] }
  ]
}

export const fetchCollections = reatomResource(async (ctx) => {
  return await getCollections("", ctx.controller)
}).pipe(withDataAtom([]), withRetry(), withErrorAtom(), withStatusesAtom(), withCache({ swr: false }))