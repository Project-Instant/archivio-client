import { PINS } from "@/(domains)/(protected)/homefeed/models/homefeed.model";
import { reatomResource, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/async";
import { action, atom } from "@reatom/core";
import { withComputed, withReset } from "@reatom/framework";

export const pinParamAtom = atom<string | null>(null, "pinParamAtom")

export interface Location {
  coords: {
    lat: number;
    lng: number;
  };
  addressName: string;
}

export interface Meta {
  location: Location;
  width: number;
  height: number;
  size: number; // in bytes
}

export interface Pin {
  id: string; // UUID or slug
  title: string;
  description?: string;
  fullImage: string; // URL or object key
  thumbnailImage?: string;
  meta?: Meta;
  saves: number;
  details: {
    commentsLength: number
  },
  tags?: string[]; // optionally model as Tag[]
  category: string; // optionally enum
  createdAt: Date;
  updatedAt?: Date;
  owner: {
    id: string; 
    login: string;
    name: string;
    avatarUrl?: string;
  };
}

async function request(pin: string): Promise<Pin> {
  // await sleep(1200)

  return PINS.find((p) => p.id === pin) as Pin;
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
export const pinFullscreenScaleAtom = atom(1, "pinFullscreenScaleOption").pipe(withReset())
export const pinIsFullscreenAtom = atom(false, "pinIsFullscreenAtom").pipe(
  withComputed((ctx, state) => {
    if (state === false) {
      pinFullscreenScaleAtom.reset(ctx)
    }
    
    return state;
  })
)

export const scaleAction = action((ctx, scale: boolean) => {
  const current = ctx.get(pinFullscreenScaleAtom)

  if (scale) {
    if (current >= 10) return;

    pinFullscreenScaleAtom(ctx, current + 1)
  } else {
    if (current <= -6) return;

    pinFullscreenScaleAtom(ctx, current - 1)
  }
})