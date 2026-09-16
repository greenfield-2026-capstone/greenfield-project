import { sejongStory } from "./sejong";

export const stories = {
  sejong: sejongStory,
} as const;

export type StoryId = keyof typeof stories;