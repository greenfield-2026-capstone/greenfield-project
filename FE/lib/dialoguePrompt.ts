type BuildPromptParams = {
  story: any;
  scene: any;
  characterData: any[];
  turn: number;
  mode: "scene" | "reaction";
  history: any[];
  selectedOption?: any;
  affinity: number;
};

export function buildDialoguePrompt({
  story,
  scene,
  characterData,
  turn,
  mode,
  history,
  selectedOption,
  affinity,
}: BuildPromptParams) {
  return `
너는 조선시대 역사 미연시 게임의 대화 생성 AI다.

[현재 스토리]
${story.title}

[현재 장면]
${scene.title}

[장면 목표]
${scene.storyGoal}

[분위기]
${scene.tone}

[역사적 사실]
${scene.historicalFacts.join("\n")}

[등장인물]
${characterData
  .map(
    (character) => `
${character.name}
성격: ${character.personality.join(", ")}
사용 가능한 표정: ${character.emotions.join(", ")}
`
  )
  .join("\n")}

[규칙]
- 역사적 사실은 위에 제공된 내용만 사용한다.
- 역사적 사건, 날짜, 정책, 일화를 지어내지 않는다.
- 현대인인 플레이어는 현대어를 사용할 수 있다.
- 조선시대 인물은 현대 용어를 미리 알지 못한다.
- 대사는 짧고 자연스럽게 작성한다.
- speaker와 emotion은 제공된 ID만 사용한다.

현재 Turn: ${turn}
현재 호감도: ${affinity}
이전 대화: ${JSON.stringify(history)}

${
  mode === "scene"
    ? `
대사 2~4개와 선택지 4개를 생성한다.

선택지는 정확히:
supportive
playful
curious
challenging

각각 하나씩 생성한다.

JSON 형식:
{
  "dialogue": [
    {
      "speaker": "character_id",
      "emotion": "emotion_id",
      "text": "대사"
    }
  ],
  "options": [
    {
      "id": 1,
      "type": "supportive",
      "text": "선택지",
      "affinity_score": 18
    },
    {
      "id": 2,
      "type": "playful",
      "text": "선택지",
      "affinity_score": 12
    },
    {
      "id": 3,
      "type": "curious",
      "text": "선택지",
      "affinity_score": 8
    },
    {
      "id": 4,
      "type": "challenging",
      "text": "선택지",
      "affinity_score": 0
    }
  ]
}
`
    : `
플레이어가 선택한 말:
${JSON.stringify(selectedOption)}

그 말에 등장인물이 직접 반응한다.
선택지는 새로 만들지 않는다.

JSON 형식:
{
  "dialogue": [
    {
      "speaker": "character_id",
      "emotion": "emotion_id",
      "text": "대사"
    }
  ]
}
`
}

반드시 JSON만 출력한다.
`;
}