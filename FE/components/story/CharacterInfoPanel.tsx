import Image from "next/image";
import { Character, Place } from "@/types/place";

export function CharacterInfoPanel({ place, character }: { place: Place; character: Character }) {
  return (
    <aside className="card messenger-side">
      <div className="messenger-side-top">
        <div className="story-portrait">
          <Image
            src={character.imageUrl}
            alt={character.name}
            fill
            sizes="120px"
            className="media-image"
            style={character.imagePosition ? { objectPosition: character.imagePosition } : undefined}
          />
        </div>
        <div>
          <h2>{character.name}</h2>
          <p>{character.role}</p>
        </div>
      </div>
      <div className="info-block">
        <span>장소</span>
        <strong>{place.name}</strong>
      </div>
      <div className="info-block">
        <span>이야기 시작점</span>
        <strong>{character.sourceTitle}</strong>
      </div>
      <div className="info-block">
        <span>인물 소개</span>
        <p>{character.summary}</p>
      </div>
      <div className="info-block">
        <span>장소 키워드</span>
        <div className="badge-row compact-badges">
          {place.tags.map((tag) => (
            <span key={tag} className="badge badge-keyword">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="info-block">
        <span>같이 보기 좋은 곳</span>
        <strong>{place.recommendationItems.join(" · ")}</strong>
      </div>
      <div className="info-block">
        <span>진행 상태</span>
        <div className="progress-track">
          <div className="progress-fill" />
        </div>
        <small>{place.highlights[0]}</small>
      </div>
    </aside>
  );
}
