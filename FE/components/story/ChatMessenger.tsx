"use client";

import { useState } from "react";
import { Character, Place } from "@/types/place";
import { askTaejo, ChatMessage, TaejoChoice } from "@/lib/chatApi";

const TOTAL_CHAPTERS = 6;
const CONVERSATIONS_BEFORE_DECISION = 3;

export function ChatMessenger({
  place,
  character,
  progress,
  nationScore,
  emotionScore,
  setProgress,
  setNationScore,
  setEmotionScore,
}: {
  place: Place;
  character: Character;
  progress: number;
  nationScore: number;
  emotionScore: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setNationScore: React.Dispatch<React.SetStateAction<number>>;
  setEmotionScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text:
        character.id === "taejo"
          ? `그대는 먼 훗날에서 온 사람이라 하였지.

나는 이성계라 하오.

지금 고려는 힘을 잃고,
백성들은 전쟁과 무거운 세금 때문에 힘든 삶을 살고 있소.

나라의 앞날을 위해 중요한 결정을 내려야 하오.

그대라면 먼저 무엇을 살펴보겠소?

백성들의 삶을 먼저 살펴야 한다고 생각하오?
아니면 나라의 질서를 먼저 바로잡아야 한다고 생각하오?`
          : character.openingLine,
    },
  ]);

  const [input, setInput] = useState("");
  const [choices, setChoices] = useState<TaejoChoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ending, setEnding] = useState<"great" | "lonely" | null>(null);
  const [conversationCount, setConversationCount] = useState(0);

  const handleSend = async () => {
    if (!input.trim() || isLoading || ending) return;

    if (choices.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "지금은 중요한 선택의 순간이오. 아래 선택지 중 하나를 골라 주시오.",
        },
      ]);
      return;
    }

    const userMessage = input.trim();
    setInput("");
    setChoices([]);

    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        role: "user",
        text: userMessage,
      },
    ];

    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const result = await askTaejo(
        userMessage,
        progress,
        nextMessages,
        nationScore,
        emotionScore
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: result.reply,
        },
      ]);

      const nextConversationCount = conversationCount + 1;
      setConversationCount(nextConversationCount);

      if (nextConversationCount >= CONVERSATIONS_BEFORE_DECISION) {
        setChoices(result.choices ?? []);
      } else {
        setChoices([]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "지금은 답하기 어렵소. 잠시 후 다시 말해 주시오.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoice = async (choice: TaejoChoice) => {
    if (isLoading || ending) return;

    const nextProgress = progress + 1;
    const nextNationScore =
      choice.type === "nation" ? nationScore + 1 : nationScore;
    const nextEmotionScore =
      choice.type === "emotion" ? emotionScore + 1 : emotionScore;

    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        role: "user",
        text: choice.text,
      },
    ];

    setProgress(nextProgress);
    setNationScore(nextNationScore);
    setEmotionScore(nextEmotionScore);
    setChoices([]);
    setConversationCount(0);
    setMessages(nextMessages);
    setIsLoading(true);

    const endingText =
      nextNationScore >= nextEmotionScore
        ? `🏛️ Great Founder

그대는 나라와 백성을 먼저 생각하는 길을 선택했소.

나는 어려운 결정들을 지나,
새 나라 조선을 세울 수 있었소.

훗날 한양에는 경복궁이 세워졌고,
그곳은 조선의 중심 궁궐이 되었소.

그대가 경복궁을 걷게 된다면,
한 나라가 시작되던 순간의 고민을 떠올려 보시오.

━━━━━━━━━━

📚 실제 역사에서는?

태조 이성계는 1392년 조선을 세우고,
한양에 경복궁을 세웠습니다.

경복궁은 조선의 왕들이 나라를 다스리던 중심 공간이 되었습니다.`
        : `👑 Lonely Father

그대는 가족과 인간적인 마음을 먼저 생각하는 길을 선택했소.

나는 사랑하는 사람들을 지키고 싶었지만,
그 마음은 왕실의 갈등으로 이어졌소.

훗날 경복궁은 조선의 상징이 되었지만,
그 안에는 나라를 세운 왕의 외로움도 함께 남아 있소.

나는 왕이었으나,
끝까지 한 사람의 아버지이기도 했소.

━━━━━━━━━━

📚 실제 역사에서는?

태조 이성계는 조선을 세웠지만,
다음 왕을 정하는 문제로 아들들과 갈등을 겪었습니다.

특히 방원과의 갈등은 조선 초기 역사에 큰 영향을 주었습니다.`;

    if (nextProgress >= TOTAL_CHAPTERS - 1) {
      setEnding(nextNationScore >= nextEmotionScore ? "great" : "lonely");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: endingText,
        },
      ]);

      setChoices([]);
      setIsLoading(false);
      return;
    }

    try {
      const result = await askTaejo(
        `나는 "${choice.text}"를 선택했습니다. 이 선택 이후의 상황을 태조 이성계의 말투로 이어서 말해주세요. 바로 다음 선택지는 만들지 말고, 사용자가 대답하기 쉬운 질문으로 끝내주세요.`,
        nextProgress,
        nextMessages,
        nextNationScore,
        nextEmotionScore
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: result.reply,
        },
      ]);

      setChoices([]);
      setConversationCount(0);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "그 선택은 중요하오. 잠시 후 다시 이야기해 보겠소.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="card messenger-main">
      <div className="messenger-header">
        <div>
          <strong>{character.name}</strong>
          <span>{place.name}</span>
        </div>

        <span className="status-chip">
          {isLoading ? "응답 생성 중" : "대화 가능"}
        </span>
      </div>

      <div className="story-guide-card">
        <h3>📖 Welcome to 경복궁</h3>

        <p>
          당신은 <strong>경복궁</strong>에서 시간을 거슬러 조선 건국 시대로
          오게 되었습니다.
        </p>

        <p>
          <strong>경복궁</strong>은 <strong>조선</strong>의 첫 번째 큰 궁궐입니다.
          조선은 약 500년 동안 한국을 다스린 왕조입니다.
        </p>

        <p>
          조선이 세워지기 전에는 <strong>고려</strong>라는 나라가 있었습니다.
          고려는 오랜 역사를 가진 나라였지만, 이 시기에는 힘이 약해지고
          있었습니다.
        </p>

        <p>
          이 변화의 중심에는 장군 <strong>이성계</strong>가 있었습니다.
          이성계는 훗날 조선을 세우고 첫 번째 왕이 되는 인물입니다.
        </p>

        <p>
          당신은 미래에서 온 여행자로서 이성계와 대화하며 중요한 선택에
          조언하게 됩니다.
        </p>
      </div>

      <div className="messenger-thread">
        {messages.map((msg, index) => (
          <div
            key={`${msg.role}-${index}`}
            className={`bubble ${
              msg.role === "user" ? "bubble-user" : "bubble-npc"
            }`}
          >
            {msg.role !== "user" && <strong>{character.name}</strong>}
            <p>{msg.text}</p>
          </div>
        ))}

        {isLoading && (
          <div className="bubble bubble-npc">
            <strong>{character.name}</strong>
            <p>생각 중입니다...</p>
          </div>
        )}
      </div>

      {choices.length > 0 && (
        <div className="choice-panel">
          <p className="choice-guide">
            ⚠️ 중요한 선택입니다. 아래 선택은 이야기의 결말에 영향을 줍니다.
          </p>

          {choices.map((choice, index) => (
            <button
              key={`${choice.text}-${index}`}
              type="button"
              onClick={() => handleChoice(choice)}
              disabled={isLoading}
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}

      {choices.length === 0 && !ending && (
  <div className="messenger-input">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSend();
      }}
      disabled={isLoading}
      placeholder={`${character.name}에게 메시지를 입력하세요`}
    />

    <button type="button" onClick={handleSend} disabled={isLoading}>
            전송
          </button>
        </div>
      )}
    </section>
  );
}