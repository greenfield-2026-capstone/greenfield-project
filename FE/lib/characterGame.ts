import { stories, type StoryId } from "../data/stories";
const aliases: Record<string, StoryId> = {
  "gojong-gyeongbokgung": "gojong",
  "sejong-gwanghwamun": "sejong",
  "jeongjo-changdeokgung": "jeongjo",
};
export function getCharacterGameId(characterId: string): StoryId | undefined {
  if (Object.hasOwn(stories, characterId)) return characterId as StoryId;
  return Object.hasOwn(aliases, characterId) ? aliases[characterId] : undefined;
}
