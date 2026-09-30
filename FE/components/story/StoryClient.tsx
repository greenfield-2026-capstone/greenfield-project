"use client";
import { useSearchParams } from "next/navigation";
import { Character, Place } from "@/types/place";
import { CharacterInfoPanel } from "./CharacterInfoPanel";
import { ChatMessenger } from "./ChatMessenger";
import { useTranslatedContent } from "@/lib/useTranslatedContent";
import { TranslationStatus } from "@/components/TranslationStatus";
import styles from "./Chat.module.css";

export function StoryClient({ place, character }: { place: Place; character: Character }) {
  const lang = useSearchParams().get("lang") ?? "ko";
  const translation = useTranslatedContent("place", place.id, place, lang);
  const localized = translation.content;
  const person = localized.characters.find(item => item.id === character.id) ?? character;
  return <div className={styles.layout}>
    <div><TranslationStatus lang={lang} {...translation} /><CharacterInfoPanel place={localized} character={person} lang={lang} /></div>
    <ChatMessenger key={`${place.id}-${character.id}-${lang}`} place={localized} character={person} lang={lang} />
  </div>;
}
