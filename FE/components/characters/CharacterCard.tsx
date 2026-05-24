import Link from "next/link";
import Image from "next/image";
import { Character } from "@/types/place";

interface CharacterCardProps {
  placeId: string;
  character: Character;
}

export function CharacterCard({ placeId, character }: CharacterCardProps) {
  return (
    <article className="card character-card">
      <div className="character-image">
        <Image
          src={character.imageUrl}
          alt={character.name}
          fill
          sizes="(max-width: 720px) 100vw, 33vw"
          className="media-image"
          style={character.imagePosition ? { objectPosition: character.imagePosition } : undefined}
        />
      </div>
      <div className="card-body">
        <h3>{character.name}</h3>
        <p className="character-role">{character.role}</p>
        <p className="source-title">{character.sourceTitle}</p>
        <p>{character.summary}</p>
        <div className="badge-row compact-badges">
          {character.focusKeywords.map((keyword) => (
            <span key={keyword} className="badge badge-keyword">
              {keyword}
            </span>
          ))}
        </div>
        <Link href={`/story/${placeId}/${character.id}`} prefetch className="button-primary">
          이 인물과 대화하기
        </Link>
      </div>
    </article>
  );
}
