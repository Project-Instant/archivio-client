import { pageContextAtom } from "@/(domains)/(auth)/models/user.model";
import { ApiResponse, experimentalClient } from "@/shared/api/api-client";
import { reatomResource, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/async";
import { action, atom } from "@reatom/core";
import { withComputed, withReset } from "@reatom/framework";
import { navigate } from "vike/client/router";

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

async function request(param: string, signal: AbortSignal): Promise<Pin | null> {
  const res = await experimentalClient(`pin/${param}`, { throwHttpErrors: false, signal })
  const json = await res.json<ApiResponse<Pin | null>>()

  if (!res.ok || !json.isSuccess) {
    return null;
  }

  return json.data;
}

export const pinResource = reatomResource(async (ctx) => {
  const param = ctx.spy(pinParamAtom)
  if (!param) return null;

  const pin = await request(param, ctx.controller.signal)

  if (!pin) {
    return navigate("/not-found", { pageContext: { isAuth: ctx.get(pageContextAtom) } })
  }

  return pin;
}).pipe(withDataAtom(), withStatusesAtom(), withErrorAtom(), withCache())

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