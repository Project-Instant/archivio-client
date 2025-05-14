import { reatomResource, withDataAtom, withStatusesAtom } from "@reatom/framework";
import { Pin, pinResource } from "./pin.model";
import { ApiResponse, experimentalClient } from "@/shared/api/api-client";
import { currentUserAction, currentUserAtom, getCurrentUser } from "@/(domains)/(auth)/models/user.model";

async function request(param: string, signal: AbortSignal) {
  const res = await experimentalClient(`pin/${param}/get-similar`, { throwHttpErrors: false, signal });
  const json = await res.json<ApiResponse<Pin[] | null>>()

  if (!res.ok || !json.isSuccess) {
    return null;
  }

  return json.data;
}

type PinRecommendationsResource = {
  data: Pin[] | null,
  status: "unauthorized" | null
}

export const pinRecommendationsResource = reatomResource<PinRecommendationsResource>(async (ctx) => {
  const currentParam = ctx.spy(pinResource.dataAtom)?.data?.id;
  if (!currentParam) return { data: null, status: null };

  const currentUser = getCurrentUser(ctx, { throwError: false })

  if (!currentUser) {
    return { data: null, status: "unauthorized" };
  }

  if (ctx.spy(currentUserAction.statusesAtom).isPending) {
    return { data: null, status: null };
  }

  return await ctx.schedule(async () => {
    const pins = await request(currentParam, ctx.controller.signal)

    return { data: pins, status: null };
  })
}).pipe(withDataAtom(), withStatusesAtom())