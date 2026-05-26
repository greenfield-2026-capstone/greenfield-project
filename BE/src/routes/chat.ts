import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import OpenAI from "openai";

const router = express.Router();

const CHAT_BASE_URL =
  process.env.LITELLM_URL ??
  process.env.ANTHROPIC_BASE_URL ??
  "";
const CHAT_API_KEY =
  process.env.LITELLM_API_KEY ??
  process.env.ANTHROPIC_AUTH_TOKEN ??
  "";
const CHAT_MODEL =
  process.env.LITELLM_MODEL ??
  "gpt-4.1-mini";

const chatClient = new OpenAI({
  apiKey: CHAT_API_KEY,
  baseURL: `${CHAT_BASE_URL.replace(/\/$/, "")}/v1`,
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
- 사용자의 입력과 이전 대화(history)를 적극 반영하라.
- 선택지는 AI가 매번 새롭게 생성한다.
- 같은 상황이라도 이전에 사용한 선택지를 반복하지 않는다.
- 선택지는 사용자의 현재 질문과 직전 대화 내용에 직접 관련되어야 한다.
- 선택지는 반드시 서로 다른 행동을 제안해야 한다.
- 선택지는 단순 찬성/반대가 아니라 실제 결정처럼 보여야 한다.
- 선택지는 반드시 2개만 만든다.
- 각 선택지는 nation 또는 emotion type을 가진다.

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
    if (!CHAT_BASE_URL || !CHAT_API_KEY) {
      return res.status(500).json({
        error: "채팅 API 설정이 비어 있습니다.",
        detail: "BE/.env에 LITELLM_URL/LITELLM_API_KEY 또는 ANTHROPIC_BASE_URL/ANTHROPIC_AUTH_TOKEN을 설정해 주세요.",
      });
    }

    const { message, progress, history, nationScore, emotionScore } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message가 필요합니다." });
    }

    const response = await chatClient.chat.completions.create({
      model: CHAT_MODEL,
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
- 이전 대화(history)를 읽고 이미 등장한 사건과 인물을 기억하여 이어서 진행하라.

사용자 입력:
${message}
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
    res.status(500).json({
      error: "채팅 응답 생성 실패",
      detail: error instanceof Error ? error.message : "알 수 없는 오류",
    });
  }
});

export default router;
