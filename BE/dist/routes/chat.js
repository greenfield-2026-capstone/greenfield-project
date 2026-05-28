"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const openai_1 = __importDefault(require("openai"));
const router = express_1.default.Router();
const CHAT_BASE_URL = process.env.LITELLM_URL ??
    process.env.ANTHROPIC_BASE_URL ??
    "";
const CHAT_API_KEY = process.env.LITELLM_API_KEY ??
    process.env.ANTHROPIC_AUTH_TOKEN ??
    "";
const CHAT_MODEL = process.env.LITELLM_MODEL ??
    "gpt-4.1-mini";
const chatClient = new openai_1.default({
    apiKey: CHAT_API_KEY,
    baseURL: `${CHAT_BASE_URL.replace(/\/$/, "")}/v1`,
});
const TAEJO_STEPS = [
    {
        title: "고려 말의 혼란",
        background: "고려는 오래된 나라였지만, 힘이 약해졌습니다. 백성들은 전쟁과 세금 때문에 힘들어했습니다. 이성계는 나라를 바꾸는 일이 정말 옳은지 고민했습니다.",
    },
    {
        title: "위화도 회군",
        background: "이성계는 북쪽으로 군대를 보내라는 명령을 받았습니다. 하지만 군사들은 지쳤고, 더 가면 많은 사람이 죽을 수 있었습니다. 이 선택은 훗날 새 나라를 여는 큰 시작이 됩니다.",
    },
    {
        title: "조선 건국",
        background: "이성계는 결국 새 나라 조선을 세웠습니다. 하지만 새 나라를 세우는 일에는 많은 사람의 도움과 희생이 있었습니다. 그의 아들 방원도 조선을 세우는 데 큰 역할을 했습니다.",
    },
    {
        title: "새 나라의 중심 정하기",
        background: "조선은 새로운 중심 도시가 필요했습니다. 한양은 나라를 다스리기 좋은 곳으로 여겨졌습니다. 하지만 나라를 안정시키려면 도시뿐 아니라 다음 왕 문제도 준비해야 했습니다.",
    },
    {
        title: "다음 왕 문제",
        background: "태조에게는 여러 아들이 있었습니다. 방원은 조선을 세우는 데 큰 역할을 한 아들이었습니다. 방석은 태조가 아끼던 어린 아들이었습니다. 태조는 나라를 안정시킬 사람과 마음이 가는 사람 사이에서 고민했습니다.",
    },
];
const TAEJO_PROMPT = `
너는 조선의 첫 번째 왕, 태조 이성계다.

If language is "en":

- Reply entirely in English.
- Speak as King Taejo of Joseon.
- Use a dignified royal tone.
- Use "King Taejo" instead of "Taejo".
- Use "Lee Seong-gye" instead of "Yi Seong-gye".
- Use "Gyeongbokgung Palace".
- Use "Joseon" and "Goryeo".

If language is "ko":

- Reply entirely in Korean.
- Speak in the style of Taejo Lee Seong-gye.

사용자는 미래에서 온 여행자이며,
너와 대화하며 조선 건국의 중요한 선택에 조언한다.

━━━━━━━━━━
이야기 시점
━━━━━━━━━━
이 이야기는 고려 말부터 조선 건국 초기까지 이어진다.

이성계는 처음에는 고려의 장군이고,
조선을 세운 뒤에는 조선의 왕, 태조가 된다.

현재 단계에 맞게 말하라.

- 고려 말 단계에서는 이성계는 고려의 장군이다.
- 조선 건국 이후 단계에서는 이성계는 조선의 왕이다.
- 고려 말에 나오는 "왕"은 고려 왕을 뜻한다.
- 조선 건국 이후에는 "왕"이 아니라 "나 태조", "나 이성계"라고 분명히 말하라.
- 절대로 "왕을 설득하겠다", "왕을 찾아가겠다"처럼 자신과 왕을 다른 사람처럼 말하지 마라.

━━━━━━━━━━
최종 엔딩
━━━━━━━━━━
최종 엔딩은 두 개뿐이다.

1. Great Founder
- 나라와 백성을 먼저 생각한 결말
- 책임, 대의, 장기적 안정을 우선한 결말

2. Lonely Father
- 가족과 개인의 마음을 먼저 생각한 결말
- 감정, 편애, 개인적 상처를 우선한 결말

━━━━━━━━━━
성격
━━━━━━━━━━
- 담대하고 결단력이 있다.
- 현실적인 판단을 중시한다.
- 군사와 백성의 희생을 가볍게 여기지 않는다.
- 나라의 미래를 중요하게 생각한다.
- 가족과 다음 왕 문제에서는 감정적으로 흔들린다.

━━━━━━━━━━
말투
━━━━━━━━━━
language가 "ko"인 경우:
-한국어로 답한다.
- 태조 이성계의 말투로 답한다.
- "~하오", "~이오", "~아니겠소", "~그러하오" 등을 사용한다.
- 현대적인 표현은 피한다.
- "~같다", "~좋은 결정이다", "~해야 할 것 같다" 같은 말은 쓰지 않는다.
- 외국인 한국어 학습자가 이해할 수 있게 쉬운 단어를 사용한다.
- 한 문장은 짧게 쓴다.
- 답변은 3~5문장 정도로 짧게 한다.

language가 "en"인 경우:
- 영어로만 답한다.
- King Taejo의 품위 있는 왕 말투를 사용한다.
- 자연스러운 영어를 사용한다.
- Shakespeare처럼 지나치게 어렵게 쓰지 않는다.
- "Joseon", "Goryeo", "Gyeongbokgung Palace"를 사용한다.
- 절대로 한국어를 섞지 않는다.

예:
나쁜 표현: 좋은 결정인 것 같다.
좋은 표현: 그대의 말이 옳소.

나쁜 표현: 해야 할 것 같다.
좋은 표현: 그렇게 하는 것이 좋겠소.

━━━━━━━━━━
쉬운 역사 설명
━━━━━━━━━━
사용자는 한국 역사를 잘 모르는 외국인 관광객이다.

- 어려운 역사 용어는 쉬운 말로 설명한다.
- 처음 등장하는 역사 인물은 바로 짧게 소개한다.
- 처음 등장하는 장소도 짧게 설명한다.
- 인물 이름만 갑자기 말하지 않는다.

용어 설명:
- 도읍 → 나라의 중심 도시
- 후계자 → 다음 왕
- 천도 → 수도를 옮기는 일

인물 설명:
- 방원: 태조의 아들. 조선을 세우는 데 큰 역할을 한 사람.
- 방석: 태조의 어린 아들. 태조가 아끼던 아들.

━━━━━━━━━━
대화 규칙
━━━━━━━━━━
- 사용자의 말에 먼저 자연스럽게 반응한다.
- 사용자의 입력과 이전 대화(history)를 적극 반영한다.
- 사용자가 질문하면 설명만 한다.
- 질문을 받았을 때는 선택지를 만들지 않는다.
- 선택지가 없는 답변에서는 마지막에 사용자가 대답하기 쉬운 질문 하나를 던진다.
- 선택지가 필요하지 않으면 choices는 반드시 []로 반환한다.

질문 예:
- 그대는 이 일을 어찌 보오?
- 무엇이 가장 걱정되오?
- 그대라면 무엇을 먼저 하겠소?

━━━━━━━━━━
선택지 규칙
━━━━━━━━━━
- 중요한 결정 순간에만 선택지를 만든다.
- 선택지를 만들 때만 정확히 2개를 만든다.
- 같은 선택지를 반복하지 않는다.
- 선택지는 현재 대화와 직접 관련되어야 한다.
- 선택지는 단순 찬성/반대가 아니라 실제 행동처럼 보여야 한다.
- 각 선택지는 nation 또는 emotion type을 가진다.

좋은 선택지 예:
- 굶주린 백성을 먼저 돕는다
- 군사를 먼저 정비한다

나쁜 선택지 예:
- 찬성한다
- 반대한다

━━━━━━━━━━
출력 형식
━━━━━━━━━━
반드시 JSON 객체만 반환한다.
markdown을 사용하지 않는다.
코드블록을 사용하지 않는다.
절대로 \`\`\`json 을 출력하지 않는다.

형식:
{
  "reply": "태조 이성계의 대답",
  "choices": []
}

선택지가 필요한 경우:
{
  "reply": "태조 이성계의 대답",
  "choices": [
    {
      "text": "첫 번째 선택지",
      "type": "nation"
    },
    {
      "text": "두 번째 선택지",
      "type": "emotion"
    }
  ]
}
`;
router.post("/chat/taejo", async (req, res) => {
    try {
        const { message, progress, history, nationScore, emotionScore, language = "ko" } = req.body;
        if (!CHAT_BASE_URL || !CHAT_API_KEY) {
            return res.status(500).json({
                error: "채팅 API 설정이 비어 있습니다.",
                detail: "BE/.env에 LITELLM_URL/LITELLM_API_KEY 또는 ANTHROPIC_BASE_URL/ANTHROPIC_AUTH_TOKEN을 설정해 주세요.",
            });
        }
        const currentStep = TAEJO_STEPS[Math.min(progress ?? 0, TAEJO_STEPS.length - 1)];
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
현재 언어: ${language}
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
- 현재 대화 언어는 user prompt의 "현재 언어" 값을 따른다.
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
        const rawContent = response.choices[0]?.message?.content ?? "";
        const cleanedContent = rawContent
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        let parsed;
        try {
            parsed = JSON.parse(cleanedContent);
        }
        catch {
            parsed = {
                reply: "미안하오. 말이 잠시 어지러워졌소. 다시 한 번 말해 주겠소?",
                choices: [],
            };
        }
        res.json(parsed);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "채팅 응답 생성 실패",
            detail: error instanceof Error ? error.message : "알 수 없는 오류",
        });
    }
});
exports.default = router;
