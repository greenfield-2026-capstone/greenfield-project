"use client";

import { useState } from "react";
import { Character, Place } from "@/types/place";
import { askTaejo, ChatMessage, TaejoChoice } from "@/lib/chatApi";

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
          ? "안녕하세요. 저는 태조 이성계입니다. 이곳은 조선이라는 새 나라가 시작된 중요한 장소입니다. 제가 어떤 고민을 했는지 함께 이야기해봅시다."
          : character.openingLine,
    },
  ]);

  const [input, setInput] = useState("");
  const [choices, setChoices] = useState<TaejoChoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

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

      setChoices(result.choices ?? []);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "지금은 답하기 어렵습니다. 잠시 후 다시 말해 주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoice = async (choice: TaejoChoice) => {
    if (isLoading) return;

    const nextProgress = progress + 1;
    const nextNationScore =
      choice.type === "nation" ? nationScore + 1 : nationScore;
    const nextEmotionScore =
      choice.type === "emotion" ? emotionScore + 1 : emotionScore;

    setProgress(nextProgress);
    setNationScore(nextNationScore);
    setEmotionScore(nextEmotionScore);
    setChoices([]);

    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        role: "user",
        text: choice.text,
      },
    ];

    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const result = await askTaejo(
        `나는 "${choice.text}"를 선택했습니다. 이 선택 이후의 상황을 쉽고 짧게 이어서 말해주세요.`,
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

      setChoices(result.choices ?? []);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "그 선택은 중요합니다. 잠시 후 다시 이야기해봅시다.",
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

      <div className="messenger-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder={`${character.name}에게 메시지를 입력하세요`}
        />

        <button type="button" onClick={handleSend} disabled={isLoading}>
          전송
        </button>
      </div>
    </section>
  );
}