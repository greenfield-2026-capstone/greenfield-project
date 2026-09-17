import Image from "next/image";
import Link from "next/link";
import { Character, Place } from "@/types/place";
import styles from "./Chat.module.css";

export function CharacterInfoPanel({ place, character, lang = "ko" }: { place: Place; character: Character; lang?: string }) {
  return <aside className={styles.sidebar}>
    <div className={styles.profile}>
      <Image src={character.imageUrl} alt={character.name} width={64} height={64} style={{objectFit: "cover", objectPosition: character.imagePosition}} />
      <div><h2>{character.name}</h2><p>{character.role}</p></div>
    </div>
    <details className={styles.details} open>
      <summary>{lang === "en" ? "About the person and place" : "인물과 장소 소개"}</summary>
      <h3>{character.name}</h3><p>{character.summary}</p>
      <h3>{place.name}</h3><p>{place.summary}</p>
      <div className={styles.tags}>{character.focusKeywords.map(tag => <span key={tag}>{tag}</span>)}</div>
      <Link href={`/places/${place.id}?lang=${lang}`}>{lang === "en" ? "Explore this place →" : "장소 자세히 보기 →"}</Link>
    </details>
  </aside>;
}
