import { jeongjo, youngJeongjo } from "./jeongjo";
import { jeongyakyong } from "./jeongyakyong";
import { sejong, youngSejong } from "./sejong";
import { kimmun } from "./kimmun";
import { taejong } from "./taejong";

export const characters = {
  jeongjo,
  young_jeongjo: youngJeongjo,
  jeongyakyong,
  sejong,
  young_sejong: youngSejong,
  taejong,
  kimmun,
} as const;

export type CharacterId = keyof typeof characters;
