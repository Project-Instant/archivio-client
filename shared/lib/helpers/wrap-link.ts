type LinkTypes = "pin" | "user"

const aliases: Record<string, string> = {
  "pin": "p",
  "user": "u"
}

export const wrapLink = (input: string, type: LinkTypes): string => {
  return `/${aliases[type]}/${input}`
}