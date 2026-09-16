import { sejong, youngSejong } from "./sejong";
import { taejong } from "./taejong";

export const characters = {
  sejong,
  young_sejong: youngSejong,
  taejong,
} as const;

export type CharacterId = keyof typeof characters;
