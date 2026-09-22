"use client";
import { useSearchParams } from "next/navigation";
import { Character, Place } from "@/types/place";
import { CharacterInfoPanel } from "./CharacterInfoPanel";
import { ChatMessenger } from "./ChatMessenger";
import styles from "./Chat.module.css";

export function StoryClient({ place, character }: { place: Place; character: Character }) {
  const lang = useSearchParams().get("lang") ?? "ko";
  return <div className={styles.layout}>
    <CharacterInfoPanel place={place} character={character} lang={lang} />
    <ChatMessenger key={`${place.id}-${character.id}-${lang}`} place={place} character={character} lang={lang} />
  </div>;
}
