import { taejoStory } from "./taejo";
import { ryuSeongryongStory } from "./ryu_seongryong";
import { yulgokStory } from "./yulgok";
import { sejongStory } from "./sejong";
import { jeongjoStory } from "./jeongjo";

import { gojongStory } from "./gojong";

import { mandeokStory } from "./mandeok";

import { heungseonStory } from "./heungseon";

import { kimJeongheeStory } from "./kim_jeonghee";

import { sinsaimdangStory } from "./sinsaimdang";

export const stories = {
  taejo: taejoStory,
  ryu_seongryong: ryuSeongryongStory,
  yulgok: yulgokStory,
  sinsaimdang: sinsaimdangStory,
  kim_jeonghee: kimJeongheeStory,
  heungseon: heungseonStory,
  mandeok: mandeokStory,
  gojong: gojongStory,
  sejong: sejongStory,
  jeongjo: jeongjoStory,
} as const;

export type StoryId = keyof typeof stories;