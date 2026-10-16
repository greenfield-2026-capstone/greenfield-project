import { sejongStory } from "./sejong";
import { jeongjoStory } from "./jeongjo";

import { gojongStory } from "./gojong";

import { mandeokStory } from "./mandeok";

import { heungseonStory } from "./heungseon";

import { kimJeongheeStory } from "./kim_jeonghee";

import { sinsaimdangStory } from "./sinsaimdang";

export const stories = {
  sinsaimdang: sinsaimdangStory,
  kim_jeonghee: kimJeongheeStory,
  heungseon: heungseonStory,
  mandeok: mandeokStory,
  gojong: gojongStory,
  sejong: sejongStory,
  jeongjo: jeongjoStory,
} as const;

export type StoryId = keyof typeof stories;