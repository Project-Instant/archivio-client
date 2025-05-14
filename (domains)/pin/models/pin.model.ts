import { currentUserAction } from "@/(domains)/(auth)/models/user.model";
import { ApiResponse, experimentalClient } from "@/shared/api/api-client";
import { navigateAction } from "@/shared/lib/utils/navigate";
import { reatomResource, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/async";
import { action, atom } from "@reatom/core";
import { withReset } from "@reatom/framework";

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
  size: number;
}

export interface Pin {
  id: string;
  title: string;
  description: string | null;
  fullImage: string;
  thumbnailImage: string | null;
  meta: Meta;
  saves: number;
  details: {
    likesLength: number;
    commentsLength: number,
    isReported: boolean;
    isSaved: boolean;
    isLiked: boolean;
  },
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date | null;
  owner: {
    id: number;
    login: string;
    name: string | null;
    avatarUrl: string | null;
  };
}

export const pinCommentValueAtom = atom<string | null>(null, "pinCommentValueAtom")
export const pinFullscreenScaleAtom = atom(1, "pinFullscreenScaleOption").pipe(withReset())
export const pinIsFullscreenAtom = atom(false, "pinIsFullscreenAtom")

pinIsFullscreenAtom.onChange((ctx, state) => !state && pinFullscreenScaleAtom.reset(ctx))

async function getPin(param: string, signal: AbortSignal): Promise<Pin | null> {
  const res = await experimentalClient(`pin/${param}`, { throwHttpErrors: false, signal })
  const json = await res.json<ApiResponse<Pin | null>>()

  if (!res.ok || !json.isSuccess) {
    return null;
  }

  return json.data;
}

type PinResource = {
  data: Pin | null,
  status: "not-found" | null
}

export const pinResource = reatomResource<PinResource>(async (ctx) => {
  const param = ctx.spy(pinParamAtom);
  if (!param) {
    return { data: null, status: null };
  }

  if (ctx.spy(currentUserAction.statusesAtom).isPending) {
    return { data: null, status: null };
  }
  
  return await ctx.schedule(async () => {
    const pin = await getPin(param, ctx.controller.signal)

    if (!pin) {
      navigateAction(ctx, "/not-found")
      return { data: null, status: "not-found" };
    }

    return { data: pin, status: null };
  })
}).pipe(withDataAtom(), withStatusesAtom(), withErrorAtom(), withCache())

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