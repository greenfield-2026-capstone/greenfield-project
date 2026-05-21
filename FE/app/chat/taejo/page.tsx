"use client";

import { useState } from "react";
import { askTaejo, ChatMessage, TaejoChoice } from "@/lib/chatApi";

const MAX_PROGRESS = 5;

export default function TaejoChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
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
  ]);

  const [input, setInput] = useState("");
  const [choices, setChoices] = useState<TaejoChoice[]>([]);
  const [progress, setProgress] = useState(0);
  const [nationScore, setNationScore] = useState(0);
  const [emotionScore, setEmotionScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ending, setEnding] = useState<"great" | "lonely" | null>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading || ending) return;

    const userMessage = input.trim();
    setInput("");
    setChoices([]);

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", text: userMessage },
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

  const handleChoice = async (choice: TaejoChoice) => {
    if (ending) return;

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
      { role: "user", text: choice.text },
    ];

    setMessages(nextMessages);

    if (nextProgress >= MAX_PROGRESS) {
      if (nextNationScore >= nextEmotionScore) {
        setEnding("great");
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            text: "👑 Great Founder. 당신은 나라와 백성, 미래의 안정을 우선했다. 역사는 당신을 조선의 창건자로 기억한다.",
          },
        ]);
      } else {
        setEnding("lonely");
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            text: "💔 Lonely Father. 당신은 가족과 감정에 더 가까운 선택을 했다. 그러나 그 선택은 깊은 외로움과 갈등을 남겼다.",
          },
        ]);
      }

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
    setMessages([
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
    ]);
    setInput("");
    setChoices([]);
    setProgress(0);
    setNationScore(0);
    setEmotionScore(0);
    setEnding(null);
  };

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-6 py-8">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_280px]">
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <p className="text-sm font-bold tracking-widest text-[#9b3f34]">
            HISTOUR
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#111827]">
            태조 이성계와 대화하기
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            대화하면서 중요한 선택을 내리고, 마지막 결말에 도달하세요.
          </p>

          <div className="mt-6 h-[500px] space-y-4 overflow-y-auto rounded-2xl border bg-[#fafafa] p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[82%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "ml-auto bg-[#29366f] text-white"
                    : msg.role === "assistant"
                    ? "mr-auto bg-[#efe2cf] text-[#1f2937]"
                    : "mx-auto bg-[#e5e7eb] text-center text-[#374151]"
                }`}
              >
                <p className="mb-1 text-xs font-bold">
                  {msg.role === "user"
                    ? "나"
                    : msg.role === "assistant"
                    ? "이성계"
                    : "Narration"}
                </p>
                <p className="whitespace-pre-line leading-relaxed">
                  {msg.text}
                </p>
              </div>
            ))}

            {isLoading && (
              <div className="mr-auto max-w-[82%] rounded-2xl bg-[#efe2cf] p-4 text-[#1f2937]">
                이성계가 생각 중입니다...
              </div>
            )}
          </div>

          {choices.length > 0 && !ending && (
            <div className="mt-5 space-y-3">
              <p className="font-bold text-[#9b3f34]">결정의 순간</p>

              {choices.map((choice, index) => (
                <button
                  key={`${choice.text}-${index}`}
                  onClick={() => handleChoice(choice)}
                  className="block w-full rounded-2xl border border-[#d7c6b4] bg-white px-5 py-4 text-left font-bold hover:bg-[#29366f] hover:text-white"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {!ending && (
            <div className="mt-5 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="이성계에게 말을 걸어보세요..."
                className="flex-1 rounded-full border px-5 py-3 outline-none"
              />

              <button
                onClick={handleSend}
                disabled={isLoading}
                className="rounded-full bg-[#29366f] px-6 py-3 font-bold text-white disabled:opacity-50"
              >
                보내기
              </button>
            </div>
          )}

          {ending && (
            <button
              onClick={restart}
              className="mt-6 rounded-full bg-[#29366f] px-6 py-3 font-bold text-white"
            >
              다시 시작하기
            </button>
          )}
        </div>

        <aside className="rounded-3xl bg-white p-6 shadow-md">
          <h2 className="text-xl font-black">진행률</h2>

          <p className="mt-4 text-3xl font-black text-[#29366f]">
            {progress} / {MAX_PROGRESS}
          </p>

          <div className="mt-4 h-3 rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-[#29366f]"
              style={{
                width: `${(progress / MAX_PROGRESS) * 100}%`,
              }}
            />
          </div>

          <div className="mt-8 space-y-3 text-sm">
            <div className="rounded-2xl bg-[#f7f1e8] p-4">
              <p className="font-bold">나라 중심 선택</p>
              <p className="mt-1 text-2xl font-black">{nationScore}</p>
            </div>

            <div className="rounded-2xl bg-[#f7f1e8] p-4">
              <p className="font-bold">감정 중심 선택</p>
              <p className="mt-1 text-2xl font-black">{emotionScore}</p>
            </div>
          </div>

          {ending && (
            <div className="mt-8 rounded-2xl bg-[#1f2a44] p-4 text-white">
              <p className="text-sm opacity-80">ENDING</p>
              <p className="mt-2 text-xl font-black">
                {ending === "great" ? "👑 Great Founder" : "💔 Lonely Father"}
              </p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}