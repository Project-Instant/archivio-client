import { reatomResource, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/async";
import { action, atom } from "@reatom/core";
import { sleep, withComputed } from "@reatom/framework";

export const pinParamAtom = atom<string | null>(null, "pinParamAtom")

export type Pin = {
  id: string,
  title: string,
  location?: {
    coords: {
      latitude: number
      longitude: number
    }
    address: string
  },
  meta?: {
    saves: number
  },
  category?: string,
  description?: string;
  thumbnailImage?: string;
  fullImage: string
}

async function request(pin: string): Promise<Pin> {
  await sleep(1200)

  return {
    id: pin,
    title: "New York City v1",
    description: "test",
    fullImage: "https://images.unsplash.com/photo-1742943892627-f7e4ddf91224?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumbnailImage: ""
  }
}

export const pinResource = reatomResource(async (ctx) => {
  const param = ctx.spy(pinParamAtom)

  if (!param) return null;

  return await ctx.schedule(() => request(param))
}).pipe(
  withDataAtom(),
  withStatusesAtom(),
  withErrorAtom(),
  withCache()
)

export const pinCommentValueAtom = atom("", "pinCommentValueAtom")

export const selectedPinAtom = atom<Pin | null>(null, "selectedPinAtom")

export const pinFullscreenScale = atom(1, "pinFullscreenScaleOption")

export const pinIsFullscreenAtom = atom(false, "pinIsFullscreenAtom").pipe(
  withComputed((ctx, state) => {
    const pin = ctx.get(pinResource.dataAtom)

    if (state && pin) {
      selectedPinAtom(ctx, pin)
    } else {
      selectedPinAtom(ctx, null)
    }

    return state;
  })
)

export const scaleAction = action((ctx, scale: boolean) => {
  const current = ctx.get(pinFullscreenScale)

  if (scale) {
    if (current >= 1.5) return;

    pinFullscreenScale(ctx, current + 0.1)
  } else {

    if (current <= 0.5) return;

    pinFullscreenScale(ctx, current - 0.1)
  }
})