import { User, userResource } from "@/(domains)/(auth)/models/user.model";
import { validateStringLength } from "@/shared/lib/helpers/validate-string";
import { reatomAsync } from "@reatom/async";
import { atom, Ctx, sleep, withReset } from "@reatom/framework";
import { toast } from "sonner";
import * as S from "sury"

type ExistsModifiedFields = keyof Pick<User, "name" | "description">

type ModifiedFields = ExistsModifiedFields | "avatar"

type NullableField = string | null;

type Changes = {
  [key: string]: NullableField
}

const nameSchema = S.string.with(S.min, 2)
const descriptionSchema = S.nullable(S.string.with(S.min, 2).with(S.max, 64))
const avatarSchema = S.nullable(S.string.with(S.min, 1))

export const isChangesAtom = atom(false, "isChangesAtom").pipe(withReset());
export const changesAtom = atom<Changes>({}, "changesAtom")
export const newNameAtom = atom<NullableField>(null, "newNameAtom")
export const newDescriptionAtom = atom<NullableField>(null, "newDescriptionAtom")
export const newAvatarAtom = atom<NullableField>(null, "newAvatarAtom");

const keySchema: Record<ModifiedFields, S.Schema<unknown>> = {
  "name": nameSchema,
  "description": descriptionSchema,
  "avatar": avatarSchema
}

function validateChanges(ctx: Ctx, newState: Changes) {
  const [k, v] = Object.entries(newState)[0];
  
  const currentValue = ctx.get(userResource.dataAtom)?.[k as ExistsModifiedFields]

  if (currentValue !== v) {
    changesAtom(ctx, (state) => ({ ...state, [k]: v }))
  } else {
    changesAtom(ctx, (state) => {
      return Object.fromEntries(
        Object.entries(state).filter(([key]) => key !== k)
      )
    })
  }
}

newNameAtom.onChange(
  (ctx, value) => validateChanges(ctx, { "name": validateStringLength(value) })
)
newDescriptionAtom.onChange(
  (ctx, value) => validateChanges(ctx, { "description": validateStringLength(value) })
)
newAvatarAtom.onChange(
  (ctx, value) => validateChanges(ctx, { "avatar": validateStringLength(value) })
);

changesAtom.onChange((ctx, state) => {
  let r: boolean = false;

  if (Object.keys(state).length >= 1) {
    const [k, v] = Object.entries(state)[0]

    r = S.safe(() => S.parseOrThrow(v, keySchema[k as ModifiedFields])).success
  };

  isChangesAtom(ctx, r)
})

export const applyChangesAction = reatomAsync(async (ctx) => {
  const changes = ctx.get(changesAtom)

  return await ctx.schedule(() => {
    userResource.dataAtom(ctx, (state) => state ? ({ ...state, ...changes }) : null)
  })
}, {
  onFulfill: async (ctx) => {
    isChangesAtom.reset(ctx);
    await sleep(25);
    toast.success("Сохранено")
  }
})