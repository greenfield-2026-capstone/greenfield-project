import { characters } from "../data/characters";
import { getCharacterGameId } from "./characterGame";
import { normalizeLocale, type LocaleCode } from "./locale";

export const VOICE_VERSION = "voice-v1";
const localeRules: Record<LocaleCode, string> = {
  ko: "왕의 질문은 ~하는가/~인가, 명령은 ~하라, 의지는 ~하겠노라 등을 상황에 맞게 쓴다. 모든 문장을 명령으로 만들지 않는다. 비왕족은 각 인물의 존대말·하오체·하게체 규칙을 따른다.",
  en: "Use dignified, measured English for royalty and cultivated English for scholars. Distinguish inquiry, command, suggestion and resolve through syntax. Do not force thou/thee, royal we or European titles.",
  "zh-Hans": "使用自然、庄重的简体中文，区分君主、臣子、学者、商人及儿童。问句、命令、提议和决心须保持原意；朕等自称仅在身份和时期合适时使用，不套用中国朝代身份。",
  "zh-Hant": "使用自然、莊重的繁體中文，區分君主、臣子、學者、商人及兒童。問句、命令、提議和決心須保持原意；朕等自稱僅在身分和時期合適時使用，不套用中國朝代身分。",
  ja: "王には落ち着いた威厳、学者には知的な語り口を使う。質問・命令・提案を区別し、臣下の敬語と王の発話を混同しない。全員に朕・ぞよ等を使わず、日本の天皇や武将に置き換えない。",
  th: "Use natural Thai register appropriate to the speaker and listener. Distinguish a monarch speaking from a subject addressing royalty; do not indiscriminately add royal vocabulary or polite particles. Preserve questions, commands and gentle suggestions separately.",
  vi: "Use natural Vietnamese with consistent self-reference and address appropriate to rank and relationship. Use trẫm only for a reigning monarch when context supports it, never for scholars, merchants or children. Preserve inquiry versus command and avoid parody of court drama.",
  ru: "Use dignified literary Russian and consistent forms of address appropriate to rank and relationship. Preserve questions, imperatives and suggestions; avoid caricatured archaisms and Russian imperial titles for Korean figures.",
  fr: "Employer un français digne et mesuré, avec des formes d’adresse cohérentes selon le rang et la relation. Distinguer questions, ordres et propositions ; éviter les archaïsmes forcés et les titres de la monarchie française.",
  de: "Würdevolles, natürliches Deutsch; Anrede und Höflichkeitsgrad nach Rang und Beziehung konsistent wählen. Fragen, Befehle und Vorschläge unterscheiden. Keine erzwungenen Archaismen oder deutschen Herrschertitel.",
  es: "Usar español digno y natural, con tratamiento coherente según rango y relación. Distinguir preguntas, órdenes y sugerencias; evitar arcaísmos forzados y títulos de la monarquía española.",
};

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
    "Preserve speech acts: a question seeks an answer, a command directs, a suggestion invites, a statement explains, resolve expresses the speaker's intent, and comfort offers care. Preserve warmth and humor; do not turn all high-status speech into commands. Use restrained historical flavor, not modern slang or exaggerated archaic parody.",
    "Narration, factual descriptions and interface labels use neutral prose. Player choices remain the modern visitor's speech, never the monarch's voice. Infer the listener from context; the visitor is not automatically a subject or servant.",
    localeRules[normalizeLocale(language)],
  ].join("\n");
}
