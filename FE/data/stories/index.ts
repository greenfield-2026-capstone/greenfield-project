import { sejongStory } from "./sejong";
import { jeongjoStory } from "./jeongjo";

export const stories = {
  sejong: sejongStory,
  jeongjo: jeongjoStory,
} as const;

export type StoryId = keyof typeof stories;