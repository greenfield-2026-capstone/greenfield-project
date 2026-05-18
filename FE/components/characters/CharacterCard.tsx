import Link from "next/link";
import { Character } from "@/types/place";

interface CharacterCardProps {
  placeId: string;
  character: Character;
}

export function CharacterCard({ placeId, character }: CharacterCardProps) {
  return (
    <article className="card character-card">
      <div className="character-image" style={{ backgroundImage: `url("${character.imageUrl}")` }} />
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
        <Link href={`/story/${placeId}/${character.id}`} className="button-primary">
          이 인물과 대화하기
        </Link>
      </div>
    </article>
  );
}
