import Image from "next/image";
import { Character, Place } from "@/types/place";

const STORY_CHAPTERS = [
  {
    title: "고려 말의 혼란",
    description:
      "고려는 오랜 세월 한국을 다스렸지만 점점 힘을 잃고 있습니다. 전쟁과 정치 문제로 백성들의 삶도 어려워졌습니다. 이성계는 나라를 어떻게 바꿔야 할지 고민하기 시작합니다.",
  },

  {
    title: "위화도 회군",
    description:
      "고려 왕은 이성계에게 중국을 공격하라고 명령했습니다. 하지만 병사들은 지쳐 있었고 전쟁을 반대하는 목소리도 많았습니다. 이성계는 명령을 따를지, 군대를 돌릴지 결정해야 합니다.",
  },

  {
    title: "조선 건국",
    description:
      "이성계는 새로운 나라를 세우려 합니다. 오래된 고려를 끝내고 새로운 질서를 만들 것인지, 아니면 기존 체제를 유지할 것인지 중요한 선택의 순간입니다.",
  },

  {
    title: "한양과 경복궁",
    description:
      "새로운 나라가 시작되었습니다. 이제 수도를 어디에 둘지 결정해야 합니다. 이성계는 한양을 선택하고 조선의 중심 궁궐인 경복궁을 세우기 시작합니다.",
  },

  {
    title: "방원과 방석",
    description:
      "태조에게는 여러 아들이 있습니다. 방원은 조선 건국에 큰 도움을 준 아들이고, 방석은 태조가 아끼는 어린 아들입니다. 이제 다음 왕을 누구로 정할지 고민이 시작됩니다.",
  },

  {
    title: "결말",
    description:
      "지금까지의 선택들이 모두 모였습니다. 당신의 조언은 태조의 결정에 어떤 영향을 주었을까요? 역사와 비교하며 결과를 확인해 보세요.",
  },
];

export function CharacterInfoPanel({
  place,
  character,
  progress,
  nationScore,
  emotionScore,
}: {
  place: Place;
  character: Character;
  progress: number;
  nationScore: number;
  emotionScore: number;
}) {
  const maxProgress = STORY_CHAPTERS.length;

  const safeProgress = Math.min(progress, STORY_CHAPTERS.length - 1);
  const currentChapter = STORY_CHAPTERS[safeProgress];

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
            style={
              character.imagePosition
                ? { objectPosition: character.imagePosition }
                : undefined
            }
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
        <span>현재 이야기</span>

        <div className="progress-status-row">
          <strong>
            Chapter {safeProgress + 1} / {maxProgress}
          </strong>
        </div>

        <p className="chapter-title">{currentChapter.title}</p>
        <small>{currentChapter.description}</small>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${((safeProgress + 1) / maxProgress) * 100}%`,
            }}
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

        <small>선택에 따라 결말이 달라집니다.</small>
      </div>
    </aside>
  );
}