import dotenv from "dotenv";
dotenv.config();

import express from "express";
import OpenAI from "openai";

console.log("URL:", process.env.ANTHROPIC_BASE_URL);

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.ANTHROPIC_AUTH_TOKEN,
  baseURL: `${process.env.ANTHROPIC_BASE_URL}/v1`,
});

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
- 무게감 있고 신중하게 말한다.
- 너무 어려운 고어체는 쓰지 않는다.
- 사용자를 "그대"라고 부른다.

게임 규칙:
- 사용자의 말에 태조 이성계처럼 답하라.
- 선택지는 사용자의 대화 내용에 맞춰 매번 새롭게 만들어라.
- 선택지는 반드시 2개만 만든다.
- 각 선택지는 반드시 "nation" 또는 "emotion" type을 가진다.
- nation은 나라, 백성, 현실 판단, 장기적 안정, 능력 중심 선택이다.
- emotion은 가족, 정, 편애, 체면, 개인 감정, 익숙한 질서 중심 선택이다.
- 엔딩을 직접 말하지 마라.
- 선택지는 너무 노골적으로 "나라 선택" 또는 "감정 선택"처럼 보이지 않게 자연스럽게 써라.
- 반드시 JSON만 출력하라.

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
`;

router.post("/chat/taejo", async (req, res) => {
  try {
    const { message, progress, history, nationScore, emotionScore } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message가 필요합니다." });
    }

    const response = await client.chat.completions.create({
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
나라 중심 점수: ${nationScore ?? 0}
감정 중심 점수: ${emotionScore ?? 0}

이전 대화:
${JSON.stringify(history ?? [])}

사용자 입력:
${message}
`,
        },
      ],
      temperature: 0.8,
    });

    const rawContent =
      response.choices[0]?.message?.content ?? "";

    let parsed;

    try {
      parsed = JSON.parse(rawContent);
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