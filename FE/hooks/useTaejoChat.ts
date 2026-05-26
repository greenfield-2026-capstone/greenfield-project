"use client";

import { useState } from "react";
import { askTaejo, ChatMessage, TaejoChoice } from "@/lib/chatApi";

const MAX_PROGRESS = 5;

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "system",
    text: "경복궁 근정전에 들어선 순간, 눈부신 빛이 당신을 감싼다.",
  },
  {
    role: "system",
    text: "1392년. 고려가 흔들리고 있다.",
  },
  {
    role: "assistant",
    text: "그대는 누구인가. 분명 방금 전까지 이곳에 없던 사람인데...",
  },
];

export type TaejoEnding = "great" | "lonely";

export function useTaejoChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [choices, setChoices] = useState<TaejoChoice[]>([]);
  const [progress, setProgress] = useState(0);
  const [nationScore, setNationScore] = useState(0);
  const [emotionScore, setEmotionScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ending, setEnding] = useState<TaejoEnding | null>(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || ending) return;

    const userMessage = input.trim();
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", text: userMessage },
    ];

    setInput("");
    setChoices([]);
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
        { role: "assistant", text: result.reply },
      ]);
      setChoices(result.choices ?? []);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "지금은 답하기 어렵구려. 잠시 후 다시 말해보시오.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const choose = async (choice: TaejoChoice) => {
    if (isLoading || ending) return;

    const nextProgress = progress + 1;
    const nextNationScore =
      choice.type === "nation" ? nationScore + 1 : nationScore;
    const nextEmotionScore =
      choice.type === "emotion" ? emotionScore + 1 : emotionScore;
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", text: choice.text },
    ];

    setProgress(nextProgress);
    setNationScore(nextNationScore);
    setEmotionScore(nextEmotionScore);
    setChoices([]);
    setMessages(nextMessages);

    if (nextProgress >= MAX_PROGRESS) {
      const nextEnding =
        nextNationScore >= nextEmotionScore ? "great" : "lonely";

      setEnding(nextEnding);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text:
            nextEnding === "great"
              ? "Great Founder. 당신은 나라와 백성, 미래의 안정을 우선했다."
              : "Lonely Father. 당신은 가족과 감정에 더 가까운 선택을 했다.",
        },
      ]);
      return;
    }

    setIsLoading(true);

    try {
      const result = await askTaejo(
        `나는 "${choice.text}"를 선택했습니다. 이 선택 이후의 상황을 이어서 말해주세요.`,
        nextProgress,
        nextMessages,
        nextNationScore,
        nextEmotionScore
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: result.reply },
      ]);
      setChoices(result.choices ?? []);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "그 선택은 무겁구려. 잠시 숨을 고르고 다시 이야기해봅시다.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const restart = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setChoices([]);
    setProgress(0);
    setNationScore(0);
    setEmotionScore(0);
    setIsLoading(false);
    setEnding(null);
  };

  return {
    choices,
    choose,
    emotionScore,
    ending,
    input,
    isLoading,
    maxProgress: MAX_PROGRESS,
    messages,
    nationScore,
    progress,
    restart,
    sendMessage,
    setInput,
  };
}
