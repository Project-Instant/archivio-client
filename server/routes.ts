import { nanoid } from 'nanoid';
import * as S from "sury"
import { CreatePinPayload } from '@/(domains)/(protected)/create-pin/models/create-pin.model';
import { ApiResponse } from '@/shared/api/api-client';
import dayjs from 'dayjs';
import { bytesToMB } from '@/shared/lib/helpers/file-helpers';
import { MAX_FILE_SIZE } from '@/(domains)/(protected)/create-pin/constants/create-pin-limitations';
import { createPinSchema } from '@/(domains)/(protected)/create-pin/constants/create-pin-schemas';
import { Pin } from '@/(domains)/pin/models/pin.model';
import { COMMENTS, PINS } from './data';
import { PinComment } from '@/(domains)/pin/components/pin-comments';
import { markHonoResponseForCbor } from './middlewares/cbor-middleware';
import { Hono } from 'hono';
import { Encoder } from 'cbor-x';

const allowedMimeTypes = ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'];

const COLLECTIONS = [
  { id: nanoid(6), title: "Default Collection", tags: ["Nature", "Aboba"] }
]

const successMeta = { isSuccess: true, errorCode: 0, errorMessage: null }

export const getHomefeedPins = new Hono().get("user/get-homefeed", async (ctx) => {
  markHonoResponseForCbor(ctx);

  return ctx.json<ApiResponse<Pin[] | null>>({
    data: PINS, ...successMeta
  }, 200)
})

export const getUserPins = new Hono().get("user/:id/get-pins", async (ctx) => {
  markHonoResponseForCbor(ctx);

  const { id } = ctx.req.param()

  const pins = PINS.filter(p => p.owner.login === id)

  return ctx.json<ApiResponse<Pin[] | null>>({
    data: pins.length ? pins : null,
    ...successMeta
  }, 200);
})

export const getUserCollections = new Hono().get("user/:id/get-collections", async (ctx) => {
  markHonoResponseForCbor(ctx);

  const { id } = ctx.req.param()

  return ctx.json<ApiResponse<typeof COLLECTIONS> | null>({
    data: COLLECTIONS, ...successMeta
  }, 200)
})

export const getPinComments = new Hono().get("pin/:id/get-comments", async (ctx) => {
  markHonoResponseForCbor(ctx);

  const { id } = ctx.req.param()

  const comments = COMMENTS.filter(c => c.pinId === id)

  return ctx.json<ApiResponse<PinComment[] | null>>({
    data: comments.length ? comments : null, ...successMeta
  }, 200)
})

export const getSimilarPinsByPin = new Hono().get("pin/:id/get-similar", async (ctx) => {
  markHonoResponseForCbor(ctx);

  const { id } = ctx.req.param()

  const pins = PINS.filter(p => p.id !== id).filter(p => p.saves > 2000)

  return ctx.json<ApiResponse<Pin[] | null>>({
    data: pins.length ? pins : null,
    ...successMeta
  }, 200)
})

export const getPin = new Hono().get("pin/:id", async (ctx) => {
  markHonoResponseForCbor(ctx);

  const { id } = ctx.req.param()

  let pin = PINS.find((p) => p.id === id) ?? null
  const commentsLength = COMMENTS.filter(c => c.pinId === id).length

  if (pin) {
    pin = {
      ...pin,
      details: {
        ...pin.details,
        commentsLength
      }
    }
  }

  return ctx.json<ApiResponse<Pin | null>>({
    data: pin, ...successMeta
  }, 200)
})

export const createPin = new Hono().post("pin/create-pin", async (ctx) => {
  const ab = await ctx.req.arrayBuffer()
  if (!ab) return ctx.body(null, 400)

  const decoded: CreatePinPayload = new Encoder().decode(new Uint8Array(ab))

  const validateMetaData = await S.safeAsync(() => S.parseAsyncOrThrow(decoded.meta, createPinSchema))

  if (!validateMetaData.success) {
    return ctx.json<ApiResponse<null>>({
      data: null, errorCode: 1, errorMessage: "Metadata validation error", isSuccess: false
    }, 402)
  }

  const file = new File(
    [decoded.file],
    validateMetaData.value.fileMeta.rawFilename ?? dayjs().toString(),
    { type: validateMetaData.value.fileMeta.type }
  )

  const validateFile = (): { success: boolean } => {
    if (Number(bytesToMB(file.size)) >= MAX_FILE_SIZE) {
      return { success: false }
    }

    if (!file.name && !validateMetaData.value.fileMeta.rawFilename) {
      return { success: false }
    }

    if (file.type) {
      return { success: allowedMimeTypes.includes(file.type) }
    } else if (validateMetaData.value.fileMeta.type) {
      return { success: allowedMimeTypes.includes(validateMetaData.value.fileMeta.type) }
    }

    return { success: false };
  }

  if (!validateFile().success) {
    return ctx.json<ApiResponse<null>>({
      data: null, errorCode: 1, errorMessage: "File validation error", isSuccess: false
    }, 402)
  }

  const id = nanoid(6)

  return ctx.json<ApiResponse<{ id: string }>>({
    data: { id }, errorCode: 0, errorMessage: null, isSuccess: true
  })
})

export const sendAnalytics = new Hono().post("analytics/send", async (ctx) => {
  const ab = await ctx.req.arrayBuffer()
  if (!ab) return ctx.body(null, 400)

  const dec = new Encoder().decode(new Uint8Array(ab))

  return ctx.json(dec, 200)
})