import * as S from "sury"
import { MAX_COLLECTIONS_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_LINK_LENGTH, MAX_TAGS_LENGTH } from '../constants/create-pin-limitations';

export const createPinSchema = S.schema({
  title: S.string.with(S.min, 2).with(S.max, 200),
  description: S.nullable(
    S.string.with(S.min, 2).with(S.max, MAX_DESCRIPTION_LENGTH)
  ),
  link: S.nullable(
    S.url(S.string).with(S.max, MAX_LINK_LENGTH)
  ),
  collection: S.nullable(
    S.array(
      S.string
    ).with(S.min, 1).with(S.max, MAX_COLLECTIONS_LENGTH)
  ),
  tags: S.array(
    S.string
  ).with(S.max, MAX_TAGS_LENGTH),
  location: S.nullable(
    S.string
  ),
  fileMeta: S.schema({
    width: S.number,
    height: S.number,
    type: S.string,
    rawFilename: S.nullish(S.string)
  }),
})