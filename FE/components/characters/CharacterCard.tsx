"use client";
import { useTranslatedContent } from "@/lib/useTranslatedContent";
import { TranslationStatus } from "@/components/TranslationStatus";
import Link from "next/link";
import Image from "next/image";
import { Character } from "@/types/place";
import { getCharacterGameId } from "@/lib/characterGame";
import styles from "./CharacterCard.module.css";

interface CharacterCardProps {
  placeId: string;
  character: Character;
  lang?: string;
}

import { getCopy } from "@/lib/translations";



export function CharacterCard({
  placeId,
  character,
  lang = "ko",
}: CharacterCardProps) {
  const t = getCopy(lang);
  const translation = useTranslatedContent("place", placeId, { characters: [character] }, lang);
  const localizedCharacter = translation.content.characters.find(item => item.id === character.id) ?? character;
  const display = localizedCharacter;
  const gameId = getCharacterGameId(character.id);

  return (
    <article className="card character-card">
      <div className="character-image">
        <Image
          src={character.imageUrl}
          alt={display.name}
          fill
          sizes="(max-width: 720px) 100vw, 33vw"
          className="media-image"
          style={
            character.imagePosition
              ? { objectPosition: character.imagePosition }
              : undefined
          }
        />
      </div>

      <div className="card-body">
        <TranslationStatus lang={lang} {...translation} />
        <h3>{display.name}</h3>

        <p className="character-role">{display.role}</p>

        <p className="source-title">{display.sourceTitle}</p>

        <p>{display.summary}</p>

        <div className="badge-row compact-badges">
          {display.focusKeywords.map((keyword: string) => (
            <span key={keyword} className="badge badge-keyword">
              {keyword}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          <Link
            href={`/story/${placeId}/${character.id}?lang=${lang}`}
            prefetch
            className={styles.chat}
            aria-label={`${display.name} · ${t.chat}`}
          >
            {t.chat}
          </Link>
          {gameId ? (
            <Link
              href={`/roleplay/${gameId}?lang=${lang}`}
              className={styles.game}
              aria-label={`${display.name} · ${t.game}`}
            >
              {t.game}
            </Link>
          ) : (
            <button type="button" className={styles.game} disabled>
              {t.gameSoon}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
