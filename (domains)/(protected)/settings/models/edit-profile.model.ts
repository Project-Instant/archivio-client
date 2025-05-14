import { currentUserAtom, User } from "@/(domains)/(auth)/models/user.model";
import { validateString } from "@/shared/lib/helpers/validate-string";
import { reatomAsync } from "@reatom/async";
import { action, atom, Ctx, withInit, withReset } from "@reatom/framework";
import { toast } from "sonner";
import * as S from "sury"

type ExistsModifiedFields = keyof Pick<User, "name" | "description" | "avatarUrl">

type StringNullableField = string | null;

type Changes = { [key: string]: StringNullableField }

export const MAX_NAME_LENGTH = 64
export const MAX_DESCRIPTION_LENGTH = 200;

const nameSchema = S.nullable(
  S.string.with(S.min, 2).with(S.max, MAX_NAME_LENGTH)
)
const descriptionSchema = S.nullable(
  S.string.with(S.min, 2).with(S.max, MAX_DESCRIPTION_LENGTH)
)
const avatarSchema = S.nullable(
  S.string.with(S.min, 1)
)

const keySchema: Record<ExistsModifiedFields, S.Schema<unknown>> = {
  "name": nameSchema,
  "description": descriptionSchema,
  "avatarUrl": avatarSchema
}

export const isChangesAtom = atom<boolean>((ctx) => {
  const changes = ctx.spy(changesAtom)

  if (Object.keys(changes).length < 1) return false

  const [key, value] = Object.entries(changes)[0]

  return S.safe(() => S.parseOrThrow(value, keySchema[key as ExistsModifiedFields])).success === true;
}, "isChangesAtom")

export const changesAtom = atom<Changes>({}, "changesAtom").pipe(withReset())
export const newNameAtom = atom<StringNullableField>(null, "newNameAtom").pipe(
  withInit((ctx) => ctx.get(currentUserAtom)?.name ?? null),
  withReset()
)
export const newDescriptionAtom = atom<StringNullableField>(null, "newDescriptionAtom").pipe(
  withInit((ctx) => ctx.get(currentUserAtom)?.description ?? null),
  withReset()
)
export const newAvatarAtom = atom<StringNullableField>(null, "newAvatarAtom").pipe(
  withInit((ctx) => ctx.get(currentUserAtom)?.avatarUrl ?? null),
  withReset()
);

newNameAtom.onChange((ctx, value) => validateChanges(ctx, { "name": validateString(value) }))
newDescriptionAtom.onChange((ctx, value) => validateChanges(ctx, { "description": validateString(value) }))
newAvatarAtom.onChange((ctx, value) => validateChanges(ctx, { "avatarUrl": validateString(value) }));

function validateChanges(ctx: Ctx, newState: Changes) {
  const [key, value] = Object.entries(newState)[0];
  const currentValue = ctx.get(currentUserAtom)?.[key as ExistsModifiedFields]

  if (currentValue !== value) {
    changesAtom(ctx, (state) => ({ ...state, [key]: value }))
  } else {
    changesAtom(ctx, (state) => {
      return Object.fromEntries(
        Object.entries(state).filter(([changesKey]) => changesKey !== key)
      )
    })
  }
}

export const resetAvatarAction = action((ctx) => {
  const newAvatar = ctx.get(newAvatarAtom)
  if (!newAvatar) return;

  URL.revokeObjectURL(newAvatar)
  newAvatarAtom(ctx, null)
})

export const applyChangesAction = reatomAsync(async (ctx) => {
  const changes = ctx.get(changesAtom)

  currentUserAtom(ctx, (state) => state ? ({ ...state, ...changes }) : null)

  return changes;
}, {
  name: "applyChangesAction",
  onFulfill: (ctx, _appliedChanges) => {
    const avatarInputValue = ctx.get(newAvatarAtom);

    if (avatarInputValue && avatarInputValue.startsWith("blob:")) {
      URL.revokeObjectURL(avatarInputValue);
    }

    changesAtom.reset(ctx)

    toast.success("Сохранено");
  },
  onReject: () => {
    toast.error("Произошла ошибка при сохранении");
  }
})