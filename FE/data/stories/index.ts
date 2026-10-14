import { sejongStory } from "./sejong";
import { jeongjoStory } from "./jeongjo";

import { gojongStory } from "./gojong";

export const stories = {
  gojong: gojongStory,
  sejong: sejongStory,
  jeongjo: jeongjoStory,
} as const;

export type StoryId = keyof typeof stories;