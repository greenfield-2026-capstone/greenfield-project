type BuildPromptParams = {
  story: any;
  scene: any;
  characterData: any[];
  turn: number;
  mode: "choices" | "reaction";
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
  const characterInfo = characterData
    .map(
      (character) => `
[${character.id}]
이름: ${character.name}
성격:
${character.personality.map((item: string) => `- ${item}`).join("\n")}

말투 규칙:
${
  character.speechRules
    ?.map((item: string) => `- ${item}`)
    .join("\n") ?? ""
}

현대어 반응 규칙:
${character.modernLanguageRule ?? ""}

사용 가능한 표정:
${character.emotions.join(", ")}
`
    )
    .join("\n");

  const fixedScript = scene.script ?? [];

  const scriptContext = fixedScript
    .map(
      (line: any) =>
        `${line.speaker}: ${line.text}`
    )
    .join("\n");

  const commonRules = `
너는 역사 기반 인터랙티브 미연시 게임의 AI다.

중요:
이 게임의 시나리오와 고정 대사는 개발자가 이미 작성했다.
너는 새로운 장면이나 스토리를 마음대로 만들지 않는다.

==============================
[스토리]
${story.title}

[현재 Turn]
${turn}

[현재 장면]
${scene.title}

[장면 목표]
${scene.storyGoal}

[분위기]
${scene.tone}

==============================
[현재 장면의 고정 대본]

${scriptContext}

위 대본은 이미 실제 게임 화면에서 재생되었다.
이 대본을 다시 작성하거나 반복하지 않는다.

==============================
[사용 가능한 역사적 사실]

${scene.historicalFacts
  .map((fact: string) => `- ${fact}`)
  .join("\n")}

매우 중요:
- 역사적 사실은 위 내용만 사용한다.
- 제공되지 않은 사건, 날짜, 정책, 일화를 만들어내지 않는다.
- 창작 대화는 가능하지만 실제 역사 기록이나 실제 발언처럼 표현하지 않는다.

==============================
[등장인물]

${characterInfo}

==============================
[장면별 추가 규칙]

${scene.specialRules
  ?.map((rule: string) => `- ${rule}`)
  .join("\n") ?? ""}

==============================
[플레이어 규칙]

- 플레이어는 현대에서 온 사람이다.
- 플레이어의 말은 현대적인 한국어로 작성할 수 있다.
- 필요하면 현대식 농담이나 표현도 사용할 수 있다.
- 조선시대 인물은 현대 용어나 현대 문화를 자동으로 이해하지 않는다.
- 모르는 현대 표현은 아는 척하지 않는다.

현재 호감도: ${affinity}

이전 선택 및 반응:
${JSON.stringify(history)}
`;

  // =========================================================
  // 선택지 생성
  // =========================================================

  if (mode === "choices") {
    return `
${commonRules}

지금은 고정 대본이 끝난 직후다.

플레이어가 현재 상황에서 실제로 말할 법한
선택지 정확히 4개만 생성한다.

새로운 NPC 대사를 생성하지 않는다.
스토리를 다음 장면으로 진행시키지 않는다.

선택지 성격:

1. supportive
- 상대에게 공감하거나 편을 들어주는 반응
- affinity_score: 15~20

2. playful
- 현대인다운 장난, 농담, 가벼운 반응
- affinity_score: 8~15

3. curious
- 역사적 상황이나 인물에게 자연스럽게 궁금한 것을 묻는 반응
- affinity_score: 5~12

4. challenging
- 반박, 의심, 직설적인 질문 또는 다른 관점
- 무조건 무례하거나 악한 선택지로 만들지 않는다.
- affinity_score: -5~5

네 선택지는 방금 끝난 대화에 직접 이어져야 한다.

JSON 형식:

{
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

반드시 JSON만 출력한다.
`;
  }

  // =========================================================
  // 선택 후 NPC 반응
  // =========================================================

  return `
${commonRules}

플레이어가 선택한 말:

${JSON.stringify(selectedOption)}

이 말에 현재 장면의 적절한 등장인물이 직접 반응한다.

중요:
- 반응은 정확히 1개만 생성한다.
- 플레이어의 말을 반복하지 않는다.
- 새로운 선택지를 생성하지 않는다.
- 다음 Turn의 내용을 미리 시작하지 않는다.
- 선택지 type만 보고 기계적으로 반응하지 않는다.
- 실제 선택지 문장과 현재 상황을 보고 감정을 결정한다.
- 캐릭터 성격을 유지한다.
- 현대 용어를 모르면 조선 사람답게 의아해하거나 뜻을 묻는다.
- 역사적 사실을 새로 만들어내지 않는다.
- 짧고 자연스러운 미연시 대사로 작성한다.
- speaker는 현재 등장인물 ID 중 하나만 사용한다.
- emotion은 해당 인물에게 제공된 emotion ID만 사용한다.

JSON 형식:

{
  "dialogue": [
    {
      "speaker": "character_id",
      "emotion": "emotion_id",
      "text": "플레이어의 선택에 대한 반응"
    }
  ]
}

반드시 JSON만 출력한다.
`;
}