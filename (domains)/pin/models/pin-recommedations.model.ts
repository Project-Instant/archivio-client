import { reatomResource, withCache, withDataAtom, withStatusesAtom } from "@reatom/framework";
import { Pin, pinResource } from "./pin.model";
import { ApiResponse, experimentalClient } from "@/shared/api/api-client";

async function request(param: string, signal: AbortSignal) {
  const res = await experimentalClient(`pin/${param}/get-similar`, { throwHttpErrors: false, signal });
  const json = await res.json<ApiResponse<Pin[] | null>>()

  if (!res.ok || !json.isSuccess) {
    return null;
  }

  return json.data;
}

export const pinRecommendationsResource = reatomResource(async (ctx) => {
  const currentParam = ctx.spy(pinResource.dataAtom)?.id;
  if (!currentParam) return null;

  return await ctx.schedule(() => request(currentParam, ctx.controller.signal))
}).pipe(
  withDataAtom(),
  withStatusesAtom(),
  withCache({ staleTime: 10 * 60 * 1000 })
)