import { characters } from "../data/characters";
import { getCharacterGameId } from "./characterGame";
import { normalizeLocale } from "./locale";
import { localeVoicePolicies } from "./voicePolicy";
export { VOICE_VERSION } from "./voicePolicy";

export function getCharacterVoice(id: string) {
  const resolved = Object.hasOwn(characters, id) ? id : getCharacterGameId(id);
  if (!resolved || !Object.hasOwn(characters, resolved)) return null;
  const value = characters[resolved as keyof typeof characters];
  return {
    id: value.id, name: value.name,
    role: "role" in value ? value.role : undefined,
    personality: "personality" in value ? value.personality : [],
    speechRules: "speechRules" in value ? value.speechRules : [],
    modernLanguageRule: "modernLanguageRule" in value ? value.modernLanguageRule : undefined,
  };
}

export function buildVoiceRules(language: string) {
  return [
    "Character voice: follow each supplied character's personality and speech rules, adapted naturally to the target language. These are fictional performance guidelines, not authentic historical quotations.",
    "Rank, era, age and relationship matter. A scholar, merchant, child or royal relative is not automatically a monarch. Scene/source context overrides a generic adult profile: before accession never use royal self-reference; distinguish king from emperor by period. Do not invent a date or status when unspecified.",
    "Preserve communicative intent, not just sentence endings: an interrogative may be a polite request or rhetorical question. Distinguish information questions, requests, commands, suggestions, statements, resolve and comfort from context. Preserve warmth and humor; do not turn all high-status speech into commands. Use restrained historical flavor, not modern slang or exaggerated archaic parody.",
    "Apply the character’s identity, relationship and current situation when choosing expressions: never copy Korean endings mechanically or use a foreign imperial self-reference solely because the speaker is a king. If rank, date or relationship is uncertain, prefer neutral self-reference or natural omission.",
    "Narration, factual descriptions and interface labels use neutral prose. Player choices remain the modern visitor's speech, never the monarch's voice. Infer the listener from context; the visitor is not automatically a subject or servant.",
    "When translating, preserve the original speaker, addressee, intent and strength; do not add commands, titles or familiarity absent from the source. In free conversation choose the speech act from the user’s actual message, not a fixed royal catchphrase. Examples illustrate register only: do not repeat them as stock replies. Return only the requested dialogue or translation, without explaining your language choices.",
    localeVoicePolicies[normalizeLocale(language)].rules,
  ].join("\n");
}
