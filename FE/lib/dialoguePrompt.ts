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
      (character) => !character.personality ? `
[${character.id}]
이름: ${character.name}
역할: ${character.role ?? "현재 대본에 지정된 보조 역할"}
사용 가능한 표정: ${character.emotions.join(", ")}
이 인물은 보조 역할이다. 별도 성격을 추측하지 말고 현재 고정 대본과 장면 규칙을 따른다.
` : `
[${character.id}]
이름: ${character.name}
역할: ${character.role ?? "현재 대본에 지정된 역할"}
성격:
${character.personality?.map((item: string) => `- ${item}`).join("\n") ?? "- 현재 대본에 지정된 역할과 상황을 따른다."}

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

  const lastDialogue = [...fixedScript].reverse().find((line: any) => line.speaker !== "narration");

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

[플레이어가 지금 답해야 할 마지막 인물 대사]
${lastDialogue ? `${lastDialogue.speaker}: ${lastDialogue.text}` : "고정 대본의 마지막 상황에 반응한다."}

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

선택지 성격 (각 type을 정확히 하나씩 생성하며, 아래 나열 순서는 표시 순서가 아니다):

- supportive: 중심 인물의 입장이나 마음에 공감하고 그 인물의 편을 드는 반응. affinity_score: 15~20
- challenging: 현재 장면에 등장하거나 언급된 신하, 백성, 다른 인물의 입장을 이해하고 그 편을 드는 반응. affinity_score: -5~5
  단순히 중심 인물을 공격하거나 무례하게 반박하지 않는다. 다른 인물이 없는 장면은 중심 인물과 다른 관점에서 그가 받는 요구나 그 영향을 짚는다. 새 인물을 만들지 않는다.
- curious: 마지막 대사에 응답하면서 그 말과 연결되는 궁금한 점을 묻는 반응. affinity_score: 5~12
- playful: 마지막 대사를 받아 현대인다운 장난이나 가벼운 농담으로 응답. affinity_score: 8~15

대화 연결 규칙:
- 네 선택지 모두 첫 문장이나 첫 절에서 마지막 인물 대사의 질문, 감정, 제안에 직접 답한다.
- 그 다음에 필요한 경우 현재 챕터의 주제나 역사적 상황으로 자연스럽게 이어간다. 연결되는 내용이 없으면 짧은 직접 응답만 해도 된다.
- 챕터 주제에 대한 의견부터 시작하거나 마지막 질문을 무시하고 정책·역사 이야기로 넘어가지 않는다.
- 예: “어린 시절의 나와 지금의 내가 많이 달라 보이는가?”에는 “그때보다 훨씬 당당해 보이십니다. 이제 왕으로서 뜻을 펼치시려는 모습이 느껴집니다.”처럼 먼저 답하고 이어간다.
- 위 예시를 다른 장면에 그대로 재사용하지 않는다. 각 장면의 실제 마지막 말에 맞춘다.
- 네 문장의 시작을 모두 똑같이 만들지 않는다. 각 선택지의 입장과 말투가 드러나게 한다.
- 네 type의 배열 순서는 매번 자유롭게 섞는다. 특정 type을 특정 번호에 고정하지 않는다.
- id는 섞인 배열의 순서대로 1~4를 부여한다.

JSON 형식:
{"options":[{"id":1,"type":"네 type 중 하나","text":"마지막 대사에 먼저 답하고 필요한 경우 챕터 이야기로 이어지는 말","affinity_score":0}]}
위 구조로 options에 정확히 4개를 넣고, 각 type과 점수 범위를 지킨다.

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
- 첫 문장이나 첫 절에서 플레이어가 실제로 선택한 답변의 입장, 질문, 농담에 직접 반응하고, 그 뒤에 필요한 장면 이야기를 이어간다.
- 마지막 인물 대사 → 플레이어 답변 → NPC 반응의 흐름을 유지한다. 챕터 설명으로 갑자기 화제를 바꾸지 않는다.
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
      "speaker": "${characterData[0]?.id}",
      "emotion": "${characterData[0]?.emotions[0]}",
      "text": "플레이어의 선택에 대한 반응"
    }
  ]
}

반드시 JSON만 출력한다.
`;
}