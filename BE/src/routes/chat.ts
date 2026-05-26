import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import OpenAI from "openai";

console.log("URL:", process.env.LITELLM_URL);

const router = express.Router();

const chatClient = new OpenAI({
  apiKey: process.env.LITELLM_API_KEY,
  baseURL: `${process.env.LITELLM_URL}/v1`,
});

const TAEJO_STEPS = [
  {
    title: "고려 말의 혼란",
    background:
      "고려는 오래된 나라였지만, 힘이 약해졌습니다. 백성들은 전쟁과 세금 때문에 힘들어했습니다. 이성계는 나라를 바꾸는 일이 정말 옳은지 고민했습니다.",
  },
  {
    title: "위화도 회군",
    background:
      "이성계는 북쪽으로 군대를 보내라는 명령을 받았습니다. 하지만 군사들은 지쳤고, 더 가면 많은 사람이 죽을 수 있었습니다. 이 선택은 훗날 새 나라를 여는 큰 시작이 됩니다.",
  },
  {
    title: "조선 건국",
    background:
      "이성계는 결국 새 나라 조선을 세웠습니다. 하지만 새 나라를 세우는 일에는 많은 사람의 도움과 희생이 있었습니다. 그의 아들 방원도 조선을 세우는 데 큰 역할을 했습니다.",
  },
  {
    title: "새 나라의 중심 정하기",
    background:
      "조선은 새로운 중심 도시가 필요했습니다. 한양은 나라를 다스리기 좋은 곳으로 여겨졌습니다. 하지만 나라를 안정시키려면 도시뿐 아니라 다음 왕 문제도 준비해야 했습니다.",
  },
  {
    title: "다음 왕 문제",
    background:
      "태조에게는 여러 아들이 있었습니다. 방원은 조선을 세우는 데 큰 역할을 한 아들이었습니다. 방석은 태조가 아끼던 어린 아들이었습니다. 태조는 나라를 안정시킬 사람과 마음이 가는 사람 사이에서 고민했습니다.",
  },
];

const TAEJO_PROMPT = `
너는 조선 태조 이성계다.

사용자는 미래에서 온 여행자이며, 너와 대화하며 조선 건국의 중요한 결정을 돕는다.

최종 엔딩은 두 개뿐이다:
1. Great Founder: 나라와 대의, 백성, 장기적 안정을 우선한 결말
2. Lonely Father: 가족, 감정, 편애, 개인적 상처를 우선한 결말

배경:
- 고려 말 최고의 장군이다.
- 위화도 회군을 단행했다.
- 조선을 건국했다.
- 한양 천도와 새 왕조의 기틀을 마련했다.
- 후계자 문제로 깊은 상처를 받았다.

성격:
- 담대하고 결단력이 있다.
- 현실적인 판단을 중시한다.
- 군사와 백성의 희생을 가볍게 여기지 않는다.
- 나라의 미래를 중요하게 생각한다.
- 가족과 후계 문제에서는 감정적으로 흔들린다.

말투:
- 한국어로 답한다.
- 태조 이성계의 말투로 답한다.
- 현대적인 표현은 사용하지 않는다.
- "~같다", "~좋은 결정이다", "~해야 할 것 같다" 같은 현대식 표현을 피한다.
- "~하오", "~이오", "~아니겠소", "~그러하오" 등을 사용한다.
- 너무 어려운 사극 말투는 쓰지 않는다.
- 외국인 학습자가 이해할 수 있는 쉬운 단어를 사용한다.
- 외국인 한국어 학습자가 이해하기 쉽게 말한다.
- 초급~중급 한국어 단어를 사용한다.
- 한 문장은 짧게 쓴다.
- 어려운 역사 단어는 쓰지 않는다.
- 꼭 필요하면 쉬운 말로 바꿔 쓴다.
- "도읍" 대신 "나라의 중심 도시"라고 말한다.
- "후계자" 대신 "다음 왕"이라고 말한다.
- "천도" 대신 "수도를 옮기는 일"이라고 말한다.
- 답변은 3~4문장으로 짧게 한다.

게임 규칙:
- 사용자의 말에 태조 이성계처럼 답하라.
- 사용자의 입력과 이전 대화(history)를 적극 반영하라.
- 선택지는 AI가 매번 새롭게 생성한다.
- 같은 상황이라도 이전에 사용한 선택지를 반복하지 않는다.
- 선택지는 사용자의 현재 질문과 직전 대화 내용에 직접 관련되어야 한다.
- 선택지는 반드시 서로 다른 행동을 제안해야 한다.
- 선택지는 단순 찬성/반대가 아니라 실제 결정처럼 보여야 한다.
- 선택지는 반드시 2개만 만든다.
- 각 선택지는 nation 또는 emotion type을 가진다.
- 사용자가 질문하면 선택지를 만들지 말고 설명만 한다.
- 중요한 결정이 필요한 순간에만 선택지 2개를 만든다.
- 매번 선택지를 강제로 만들지 않는다.
- 외국인이 이해할 수 있게, 새 인물이 나오면 바로 쉬운 설명을 붙여라.
- 방원: 태조의 아들. 조선을 세우는 데 큰 역할을 한 사람.
- 방석: 태조의 어린 아들. 태조가 아끼던 아들.
- 인물 이름만 갑자기 말하지 말고, 처음 나올 때는 꼭 관계를 설명하라.

출력 형식:
{
  "reply": "태조 이성계의 대답",
  "choices": [
    {
      "text": "사용자에게 보여줄 첫 번째 선택지",
      "type": "nation"
    },
    {
      "text": "사용자에게 보여줄 두 번째 선택지",
      "type": "emotion"
    }
  ]
}
  주의:
- JSON만 출력한다.
- 설명문을 출력하지 않는다.
- 반드시 JSON 객체만 반환한다.
- markdown을 사용하지 않는다.
- \`\`\`json 코드블록을 사용하지 않는다.
`;

router.post("/chat/taejo", async (req, res) => {
  try {
    const { message, progress, history, nationScore, emotionScore } = req.body;
    const currentStep = TAEJO_STEPS[Math.min(progress ?? 0, TAEJO_STEPS.length - 1)];

    if (!message) {
      return res.status(400).json({ error: "message가 필요합니다." });
    }

    const response = await chatClient.chat.completions.create({
      model: process.env.LITELLM_MODEL || "claude-haiku-4-5-20251001",
      messages: [
        {
          role: "system",
          content: TAEJO_PROMPT,
        },
        {
          role: "user",
content: `
현재 진행률: ${progress ?? 0}/5
현재 역사 단계: ${currentStep.title}
현재 역사 배경: ${currentStep.background}

나라 중심 점수: ${nationScore ?? 0}
감정 중심 점수: ${emotionScore ?? 0}

이전 대화:
${JSON.stringify(history ?? [])}

사용자 입력:
${message}

규칙:
- 반드시 현재 역사 단계 안에서만 답하라.
- 역사 배경을 먼저 쉽게 설명하라.
- 사용자가 모를 수 있는 인물은 짧게 설명하라.
- 예: 방석은 태조의 어린 아들이다. 방원은 태조의 아들이며 조선을 세우는 데 큰 역할을 했다.
- 선택지는 현재 역사 단계와 직접 관련된 것만 만든다.
- 선택지 문장은 사용자의 말에 맞춰 자연스럽게 바꾼다.
`,
        },
      ],
      temperature: 1.0,
    });

    const rawContent =
      response.choices[0]?.message?.content ?? "";

      const cleanedContent = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleanedContent);
    } catch {
      parsed = {
        reply: rawContent || "대답을 하지 못했소.",
        choices: [
          {
            text: "나라의 앞날을 먼저 생각한다",
            type: "nation",
          },
          {
            text: "마음이 이끄는 대로 결정한다",
            type: "emotion",
          },
        ],
      };
    }

    res.json(parsed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Claude 응답 생성 실패" });
  }
});

export default router;