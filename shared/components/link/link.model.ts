import { navigateAction } from "@/shared/lib/utils/navigate";
import { action, atom } from "@reatom/core";
import { withReset } from "@reatom/framework";
import consola from "consola";

export const LINK_ALIASES: Record<string, string> = {
  "/settings": "/settings/edit-profile"
}

const WHITELIST_LINKS_REGEX = new RegExp(
  '^(?:' + 
      '(?:' + 
          'https?://(' +
              // 1. Origin
              'mvp\\.fasberry\\.su|' +
              // 2. Discord
              '(?:[a-zA-Z0-9-]+\\.)*discord\\.com|' +
              'discord\\.gg|' +
              '(?:[a-zA-Z0-9-]+\\.)*discordapp\\.com|' +
              // 3. Telegram
              '(?:[a-zA-Z0-9-]+\\.)*telegram\\.org|' +
              't\\.me|' +
              // 4. VK
              '(?:[a-zA-Z0-9-]+\\.)*vk\\.com|' +
              // 5. YouTube
              '(?:[a-zA-Z0-9-]+\\.)*youtube\\.com|' +
              'youtu\\.be' +
          ')' +
          '(?:[:/?#]|$)' +
      ')' +
      '|' + 
      '(?:' + 
          '/(?!/)[^\\s]*' +
      ')' +
  ')$', 
  'i' // 'i' для регистронезависимого поиска
);

export const selectedLinkAtom = atom<string>("/", "selectedLinkAtom").pipe(withReset())
export const nonverifiedLinkDialogIsOpenAtom = atom(false, "nonverifiedLinkDialogIsOpenAtom")

export const navigateToNonverifiedLinkAction = action((ctx) => {
  nonverifiedLinkDialogIsOpenAtom(ctx, false)
  navigateAction(ctx, ctx.get(selectedLinkAtom))
  selectedLinkAtom.reset(ctx)
})

export const checkLinkAction = action(async (ctx, link: string) => {
  const isIncludes = WHITELIST_LINKS_REGEX.test(link)

  consola.info(isIncludes ? "verified" : "non-verified")

  if (!isIncludes) {
    nonverifiedLinkDialogIsOpenAtom(ctx, true)
    return selectedLinkAtom(ctx, link)
  } else {
    return navigateAction(ctx, link)
  }
})