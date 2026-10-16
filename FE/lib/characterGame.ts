import { stories, type StoryId } from "../data/stories";
const aliases: Record<string, StoryId> = {
  "shin-saimdang": "sinsaimdang",
  chusa: "kim_jeonghee",
  "heungseon-seokpa": "heungseon",
  "heungseon-unhyeon": "heungseon",
  gimandeok: "mandeok",
  "gojong-gyeongbokgung": "gojong",
  "sejong-gwanghwamun": "sejong",
  "jeongjo-changdeokgung": "jeongjo",
};
export function getCharacterGameId(characterId: string): StoryId | undefined {
  if (Object.hasOwn(stories, characterId)) return characterId as StoryId;
  return Object.hasOwn(aliases, characterId) ? aliases[characterId] : undefined;
}
