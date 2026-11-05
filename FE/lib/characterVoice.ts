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
    "Preserve communicative intent, not just sentence endings: an interrogative may be a polite request or rhetorical question. Distinguish information questions, requests, commands, suggestions, statements, resolve and comfort from context. Preserve warmth and humor; do not turn all high-status speech into commands. Use a clearly historical literary register with readable period vocabulary and forms of address, not merely polite contemporary speech. Calibrate archaism to the character and scene; do not turn later-period figures into ancient monarchs or make children sound like adult courtiers.",
    "Apply the character’s identity, relationship and current situation when choosing expressions: never copy Korean endings mechanically or use a foreign imperial self-reference solely because the speaker is a king. If rank, date or relationship is uncertain, prefer neutral self-reference or natural omission.",
    "Narration, factual descriptions and interface labels use neutral prose. Player choices remain the modern visitor's speech, never the monarch's voice. Infer the listener from context; the visitor is not automatically a subject or servant.",
    "When translating, preserve the original speaker, addressee, intent and strength; do not add commands, titles or familiarity absent from the source. In free conversation choose the speech act from the user’s actual message, not a fixed royal catchphrase. Examples illustrate register only: do not repeat them as stock replies. Return only the requested dialogue or translation, without explaining your language choices.",
    "Make social relationships audible in the wording: a sovereign addresses a known courtier with composed authority; a courtier addresses a sovereign deferentially; scholars, merchants, family and children have their own registers. A high-ranking speaker need not be insulting, angry or commanding in every turn. Use historically colored address and syntax when supported by the source relationship; retain a respectful neutral fallback when the relationship is unknown. Do not explain these decisions in dialogue.",
    localeVoicePolicies[normalizeLocale(language)].rules,
  ].join("\n");
}
