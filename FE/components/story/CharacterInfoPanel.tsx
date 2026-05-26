import Image from "next/image";
import { Character, Place } from "@/types/place";

const texts = {
  ko: {
    place: "장소",
    startPoint: "이야기 시작점",
    intro: "인물 소개",
    keywords: "장소 키워드",
    nearby: "같이 보기 좋은 곳",
    currentStory: "현재 이야기",
    nation: "나라 중심",
    emotion: "감정 중심",
    endingNotice: "선택에 따라 결말이 달라집니다.",
  },
  en: {
    place: "Place",
    startPoint: "Story Starting Point",
    intro: "Character Introduction",
    keywords: "Place Keywords",
    nearby: "Places to Visit Together",
    currentStory: "Current Story",
    nation: "Nation-centered",
    emotion: "Emotion-centered",
    endingNotice: "Your choices will change the ending.",
  },
};

const STORY_CHAPTERS = {
  ko: [
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
  ],
  en: [
    {
      title: "The Turmoil of Late Goryeo",
      description:
        "Goryeo ruled Korea for many years, but its power is now weakening. Wars and political problems have made life difficult for the people. Lee Seong-gye begins to wonder how the nation should change.",
    },
    {
      title: "The Wihwado Retreat",
      description:
        "The king of Goryeo ordered Lee Seong-gye to attack China. However, the soldiers were exhausted, and many opposed the war. Lee Seong-gye must decide whether to obey the order or turn his army back.",
    },
    {
      title: "The Founding of Joseon",
      description:
        "Lee Seong-gye tries to establish a new nation. This is a crucial moment: should he end old Goryeo and create a new order, or preserve the existing system?",
    },
    {
      title: "Hanyang and Gyeongbokgung Palace",
      description:
        "A new nation has begun. Now the capital must be chosen. Lee Seong-gye chooses Hanyang and begins building Gyeongbokgung Palace, the central palace of Joseon.",
    },
    {
      title: "Bangwon and Bangseok",
      description:
        "King Taejo has several sons. Bangwon helped greatly in founding Joseon, while Bangseok is the young son Taejo deeply cherishes. Now the question of who should become the next king begins.",
    },
    {
      title: "Ending",
      description:
        "All your choices have now come together. How did your advice influence King Taejo’s decision? Compare the result with history and see how the story ends.",
    },
  ],
};

const characterPanelEn: Record<string, any> = {
  taejo: {
    name: "King Taejo Lee Seong-gye",
    role: "The Beginning of the Capital and Dynasty",
    sourceTitle: "A Pillar That Supported Joseon",
    intro:
      "He was the king who founded Joseon. In the troubled final years of Goryeo, he created a new nation and had to make difficult choices between country and family.",
  },
};

const placePanelEn: Record<string, any> = {
  gyeongbokgung: {
    name: "Gyeongbokgung Palace",
    tags: ["Joseon", "Palace", "Royal Family", "Seoul"],
    recommendationItems: ["Gwanghwamun", "Gyeonghoeru", "Okhoru"],
  },
};

export function CharacterInfoPanel({
  place,
  character,
  progress,
  nationScore,
  emotionScore,
  lang = "ko",
}: {
  place: Place;
  character: Character;
  progress: number;
  nationScore: number;
  emotionScore: number;
  lang?: string;
}) {
  const t = lang === "en" ? texts.en : texts.ko;
  const chapters = lang === "en" ? STORY_CHAPTERS.en : STORY_CHAPTERS.ko;

  const maxProgress = chapters.length;
  const safeProgress = Math.min(progress, chapters.length - 1);
  const currentChapter = chapters[safeProgress];

  const characterEn = characterPanelEn[character.id];
  const placeEn = placePanelEn[place.id];

  const displayCharacter =
    lang === "en" && characterEn ? characterEn : character;

  const displayPlace = lang === "en" && placeEn ? placeEn : place;

  return (
    <aside className="card messenger-side">
      <div className="messenger-side-top">
        <div className="story-portrait">
          <Image
            src={character.imageUrl}
            alt={displayCharacter.name}
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
          <h2>{displayCharacter.name}</h2>
          <p>{displayCharacter.role}</p>
        </div>
      </div>

      <div className="info-block">
        <span>{t.place}</span>
        <strong>{displayPlace.name}</strong>
      </div>

      <div className="info-block">
        <span>{t.startPoint}</span>
        <strong>{displayCharacter.sourceTitle}</strong>
      </div>

      <div className="info-block">
        <span>{t.intro}</span>
        <p>
          {lang === "en"
            ? displayCharacter.intro
            : "조선을 세운 왕입니다. 고려 말 혼란한 시기에 새 나라를 만들었고, 나라와 가족 사이에서 어려운 선택을 해야 했습니다."}
        </p>
      </div>

      <div className="info-block">
        <span>{t.keywords}</span>
        <div className="badge-row compact-badges">
          {displayPlace.tags.map((tag: string) => (
            <span key={tag} className="badge badge-keyword">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="info-block">
        <span>{t.nearby}</span>
        <strong>{displayPlace.recommendationItems.join(" · ")}</strong>
      </div>

      <div className="info-block">
        <span>{t.currentStory}</span>

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
            <span>{t.nation}</span>
            <strong>{nationScore}</strong>
          </div>

          <div className="score-card emotion">
            <span>{t.emotion}</span>
            <strong>{emotionScore}</strong>
          </div>
        </div>

        <small>{t.endingNotice}</small>
      </div>
    </aside>
  );
}