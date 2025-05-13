import { wrapLink } from '@/shared/lib/helpers/wrap-link';
import { ApiResponse, experimentalClient } from "@/shared/api/api-client";
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
import { spawnTimerToast } from "@/shared/lib/utils/spawn-timer-toast";
import { navigate } from "vike/client/router";
import { currentUserAtom, pageContextAtom } from '@/(domains)/(auth)/models/user.model';
import { MAX_FILE_SIZE, MAX_TAGS_LENGTH } from '../constants/create-pin-limitations';
import { createPinSchema } from '../constants/create-pin-schemas';

type ImageMeta = S.Output<typeof createPinSchema>["fileMeta"];

type Collection = {
  id: string;
  title: string;
  tags: string[];
};

export type CreatePinPayload = {
  meta: S.Output<typeof createPinSchema>,
  file: Uint8Array<ArrayBuffer>
}

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

const TAGS_EXAMPLE = ["abc", "bca", "cba", "cab", "abc", "bca", "cba", "cab"]

export const similarTagsResource = reatomResource(async (ctx) => {
  if (!ctx.spy(isValidTagsAtom)) return;

  const value = ctx.spy(inputTagAtom)

  await sleep(15)

  return await ctx.schedule(() => TAGS_EXAMPLE)
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
  }, S.merge(createPinSchema, S.schema({ imageUrl: S.string }))))

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

const createdPinIdAtom = atom<string | null>(null, "createdPinIdAtom").pipe(withReset())

createdPinIdAtom.onChange((ctx, state) => {
  if (state) {
    spawnTimerToast({
      name: "pin_created",
      message: "Пин создан",
      buttonMessage: "Перейти к пину",
      cancelAction: redirectToCreatedPin
    }).create(ctx)
  }

  return state;
})

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
  await validateFileSize(target)

  const { height, width } = await getImageDimensions(target)

  return await ctx.schedule(() => {
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

const redirectToCreatedPin = action((ctx) => {
  const createdPinId = ctx.get(createdPinIdAtom)
  const pc = ctx.get(pageContextAtom)
  if (!createdPinId || !pc) return;

  navigate(wrapLink(createdPinId, "pin"), { pageContext: { isAuth: pc.isAuth } })
  createdPinIdAtom.reset(ctx)
})

export const uploadPinAction = reatomAsync(async (ctx) => {
  if (!ctx.get(isValidAtom)) return;

  const meta = {
    title: ctx.get(titleAtom),
    description: ctx.get(descriptionAtom),
    link: ctx.get(linkAtom),
    collection: ctx.get(collectionAtom),
    tags: ctx.get(tagsAtom),
    location: ctx.get(locationAtom),
    fileMeta: ctx.get(imageMetaAtom)
  };

  const fileUrl = ctx.get(imageUrlAtom);

  if (!fileUrl || !meta) return;

  const fileBlob = await fetch(fileUrl).then(res => res.blob());

  const fileArrayBuffer = await fileBlob.arrayBuffer();
  if (!fileArrayBuffer) return;

  const fileUint8Array = new Uint8Array(fileArrayBuffer);

  // @ts-expect-error
  const payload: CreatePinPayload = { meta, file: fileUint8Array }
  const payloadEncoded = new Encoder().encode(payload);

  await sleep(200);

  const res = await experimentalClient.post("pin/create-pin", {
    body: payloadEncoded,
    throwHttpErrors: false,
    signal: ctx.controller.signal
  })

  const json = await res.json<ApiResponse<{ id: string } | null>>()

  if (!res.ok || !json.isSuccess) {
    throw new Error(json.errorMessage ?? "Не удалось создать пин")
  }

  if (json.data) createdPinIdAtom(ctx, json.data.id)
}, {
  name: "uploadPinAction",
  onFulfill(ctx) {
    titleAtom.reset(ctx)
    descriptionAtom.reset(ctx)
    linkAtom.reset(ctx)
    collectionAtom.reset(ctx)
    tagsAtom.reset(ctx)
    locationAtom.reset(ctx)
    deleteImageAction(ctx)
  },
  onReject(ctx, e) {
    if (e instanceof Error) {
      toast.error(e.message)
    }
  },
}).pipe(withStatusesAtom(), withAbort())

async function getCollections(param: string, signal: AbortSignal): Promise<Collection[] | null> {
  const res = await experimentalClient(`user/${param}/get-collections`, { throwHttpErrors: false, signal })
  const json = await res.json<ApiResponse<Collection[]>>()

  if (!res.ok || !json.isSuccess) {
    return null;
  }

  return json.data
}

export const fetchCollections = reatomResource(async (ctx) => {
  const currentUser = ctx.get(currentUserAtom)
  if (!currentUser) return;
  
  return await ctx.schedule(() => getCollections(currentUser.login, ctx.controller.signal))
}).pipe(withDataAtom([]), withRetry(), withErrorAtom(), withStatusesAtom(), withCache({ swr: false }))