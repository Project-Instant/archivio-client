import { bytesToMB, getImageDimensions } from "@/shared/lib/helpers/file-helpers"
import { atom, reatomAsync, reatomResource, sleep, withCache, withComputed, withDataAtom, withErrorAtom, withRetry, withStatusesAtom } from "@reatom/framework"
import * as S from "sury"

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

type ImageMeta = {
  width: number,
  height: number,
  type: File["type"]
}

type Collection = {
  id: string;
  title: string;
  tags: string;
};

const createPinSchema = S.schema({
  title: S.string.with(S.min, 1),
  description: S.string.with(S.min, 2),
  link: S.url(S.string).with(S.optional),
  collection: S.string.with(S.min, 2).with(S.optional),
})

export const imageUrlAtom = atom<string | undefined>(undefined, "imageUlrAtom")
export const imageMetaAtom = atom<ImageMeta | null>(null, "imageMetaAtom")
export const titleAtom = atom<string>("", "titleAtom")
export const descriptionAtom = atom<string>("", "descriptionAtom")
export const linkAtom = atom<string>("", "linkAtom")
export const collectionAtom = atom<string>("", "collectionAtom")
export const tagAtom = atom<string>("", "tagAtom")
export const isValidAtom = atom<boolean>(false, "isValidAtom")
export const locationAtom = atom<string | null>(null, "locationAtom")
export const isRejectedErrorAtom = atom<string>("", "isRejectedErrorAtom")

export const isRejectedAtom = atom<boolean>(false, "isRejectedAtom").pipe(
  withComputed((ctx, state) => {
    if (state === true) {
      rejectAction(ctx)
    }

    return state
  })
)

export const rejectAction = reatomAsync(async (ctx) => {
  return await ctx.schedule(async () => {
    await sleep(5000)

    isRejectedAtom(ctx, false)
    isRejectedErrorAtom(ctx, "")
  })
})

export const deleteImageAction = reatomAsync(async (ctx) => {
  return await ctx.schedule(() => {
    const url = ctx.get(imageUrlAtom)

    if (url) {
      URL.revokeObjectURL(url)
    }

    imageUrlAtom(ctx, undefined)
    imageMetaAtom(ctx, null)
  })
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
    imageMetaAtom(ctx, { width, height, type: target.type })
  })
}, {
  onReject(ctx, e) {
    if (e instanceof Error) {
      isRejectedAtom(ctx, true)
      isRejectedErrorAtom(ctx, e.message)
    }
  }
}).pipe(withStatusesAtom())

async function getCollections(...params: Parameters<typeof fetch>): Promise<Array<Collection>> {
  return [
    { id: "1", title: "Default Collection", tags: "" }
  ]
}

export const fetchCollections = reatomResource(async (ctx) => {
  return await getCollections("", ctx.controller)
}).pipe(
  withDataAtom([]),
  withRetry(),
  withErrorAtom(),
  withStatusesAtom(),
  withCache({ swr: false })
)