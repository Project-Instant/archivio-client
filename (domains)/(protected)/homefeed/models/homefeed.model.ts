import { Pin } from "@/(domains)/pin/models/pin.model";
import { ApiResponse, experimentalClient } from "@/shared/api/api-client";
import { reatomResource, withCache, withDataAtom, withErrorAtom, withStatusesAtom } from "@reatom/async";

async function request(signal: AbortSignal) {
  const res = await experimentalClient("user/get-homefeed", { throwHttpErrors: false, signal })
  const json = await res.json<ApiResponse<Pin[] | null>>()

  if (!res.ok || !json.isSuccess) {
    return null;
  }

  return json.data;
}

export const homefeedResource = reatomResource(async (ctx) => {
  return await ctx.schedule(() => request(ctx.controller.signal))
}).pipe(withDataAtom(), withCache(), withStatusesAtom(), withErrorAtom())