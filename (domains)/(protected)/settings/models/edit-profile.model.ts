import { User, userResource } from "@/(domains)/(auth)/models/user.model";
import { reatomAsync } from "@reatom/async";
import { atom, Ctx, sleep } from "@reatom/framework";
import { toast } from "sonner";

type ModifiedFields = keyof Pick<User, "name" | "description" | "avatarUrl">

type Changes = {
  key: ModifiedFields,
  value: string | null;
}

export const isChangesAtom = atom(false, "isChangesAtom");
export const changesAtom = atom<Array<Changes>>([], "changesAtom")
export const newNameAtom = atom("", "newNameAtom")
export const newDescriptionAtom = atom<string | null>(null, "newDescriptionAtom")
export const newAvatarAtom = atom("", "newAvatarAtom");

function validateChanges(ctx: Ctx, newState: Changes) {
  const currentValue = ctx.get(userResource.dataAtom)?.[newState.key as ModifiedFields]

  if (currentValue !== newState.value) {
    changesAtom(ctx,
      (state) => [...state.filter(d => d.key !== newState.key), newState]
    )
  } else {
    changesAtom(ctx,
      (state) => state.filter(d => d.key !== newState.key)
    )
  }
}

newNameAtom.onChange((ctx, value) => {
  validateChanges(ctx, { key: "name", value: value.length ? value : null })
})
newDescriptionAtom.onChange((ctx, value) => {
  validateChanges(ctx, { key: "description", value: value && value.length ? value : null })
})
newAvatarAtom.onChange((ctx, value) => {
  validateChanges(ctx, { key: "avatarUrl", value: value.length ? value : null })
});

changesAtom.onChange((ctx, value) => {
  console.log(value)
  isChangesAtom(ctx, value.length >= 1)
})

export const applyChangesAction = reatomAsync(async (ctx) => {
  return await ctx.schedule(() => {
    const updated = ctx.get(changesAtom)

    if (!updated) return null;

    userResource.dataAtom(ctx, (state) => state ? ({ ...state, ...updated }) : null)
  })
}, {
  onFulfill: async (ctx) => {
    await sleep(50);
    toast.success("Сохранено")
  }
})
