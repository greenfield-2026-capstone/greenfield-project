import Image from "next/image";
import { Character, Place } from "@/types/place";

export function CharacterInfoPanel({
  place,
  character,
  progress = 0,
  nationScore = 0,
  emotionScore = 0,
}: {
  place: Place;
  character: Character;
  progress?: number;
  nationScore?: number;
  emotionScore?: number;
}) {
  const maxProgress = 5;

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
        <p>
          조선을 세운 왕입니다. 고려 말 혼란한 시기에 새 나라를 만들었고,
          나라와 가족 사이에서 어려운 선택을 해야 했습니다.
        </p>
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

        <div className="progress-status-row">
          <strong>
            {progress} / {maxProgress}
          </strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(progress / maxProgress) * 100}%` }}
          />
        </div>

        <div className="score-grid">
          <div className="score-card nation">
            <span>나라 중심</span>
            <strong>{nationScore}</strong>
          </div>

          <div className="score-card emotion">
            <span>감정 중심</span>
            <strong>{emotionScore}</strong>
          </div>
        </div>

        <small>
          선택에 따라 결말이 달라집니다.
        </small>
      </div>
    </aside>
  );
}
