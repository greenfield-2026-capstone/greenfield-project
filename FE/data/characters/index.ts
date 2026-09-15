import { sejong, youngSejong } from "./sejong";
import { kimmun } from "./kimmun";
import { taejong } from "./taejong";

export const characters = {
  sejong,
  young_sejong: youngSejong,
  kimmun,
  taejong,
} as const;

export type CharacterId = keyof typeof characters;