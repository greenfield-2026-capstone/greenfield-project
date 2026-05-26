import Link from "next/link";
import Image from "next/image";
import { Character } from "@/types/place";
import { TranslatedText } from "@/components/translate/TranslatedText";

interface CharacterCardProps {
  placeId: string;
  character: Character;
}

export function CharacterCard({
  placeId,
  character,
}: CharacterCardProps) {
  return (
    <article className="card character-card">
      <div className="character-image">
        <Image
          src={character.imageUrl}
          alt={character.name}
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
        <h3>
          <TranslatedText text={character.name} />
        </h3>

        <p className="character-role">
          <TranslatedText text={character.role} />
        </p>

        <p className="source-title">
          <TranslatedText text={character.sourceTitle} />
        </p>

        <p>
          <TranslatedText text={character.summary} />
        </p>

        <div className="badge-row compact-badges">
          {character.focusKeywords.map((keyword) => (
            <span key={keyword} className="badge badge-keyword">
              <TranslatedText text={keyword} />
            </span>
          ))}
        </div>

        <Link
          href={`/story/${placeId}/${character.id}`}
          prefetch
          className="button-primary"
        >
          <TranslatedText text="이 인물과 대화하기" />
        </Link>
      </div>
    </article>
  );
}