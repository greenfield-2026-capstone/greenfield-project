import { jeongjo, youngJeongjo } from "./jeongjo";
import { jeongyakyong } from "./jeongyakyong";
import { sejong, youngSejong } from "./sejong";
import { kimmun } from "./kimmun";
import { taejong } from "./taejong";

import { gojongCharacters } from "./gojong";

export const characters = {
  ...gojongCharacters,
  jeongjo,
  young_jeongjo: youngJeongjo,
  jeongyakyong,
  sejong,
  young_sejong: youngSejong,
  taejong,
  kimmun,
} as const;

export type CharacterId = keyof typeof characters;
