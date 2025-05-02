import { reatomResource, withCache, withDataAtom, withStatusesAtom } from "@reatom/framework";
import { pinParamAtom } from "./pin.model";
import { PINS } from "@/(domains)/(protected)/homefeed/models/homefeed.model";

export const pinRecommendationsResource = reatomResource(async (ctx) => {
  const currentParam = ctx.spy(pinParamAtom);

  if (!currentParam) return null;

  return await ctx.schedule(() => PINS.filter(p => p.id !== currentParam).filter(p => p.saves > 2000))
}).pipe(
  withDataAtom(),
  withStatusesAtom(),
  withCache({ staleTime: 10 * 60 * 1000 })
)