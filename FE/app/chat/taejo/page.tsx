"use client";

import { useState } from "react";
import {
  askTaejo,
  generateBackground,
  ChatMessage,
  TaejoChoice,
} from "@/lib/chatApi";

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

  const [backgroundImage, setBackgroundImage] = useState("");
  const [isBgChanging, setIsBgChanging] = useState(false);

  const changeBackground = async (scene: string) => {
    try {
      setIsBgChanging(true);
      const result = await generateBackground(scene);
      setBackgroundImage(result.imageUrl);
    } catch {
      console.log("배경 이미지 생성 실패");
    } finally {
      setTimeout(() => setIsBgChanging(false), 700);
    }
  };

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

    const scene =
      choice.type === "nation"
        ? `Joseon palace, serious political decision, stable kingdom, ${choice.text}`
        : `quiet royal palace at night, emotional family conflict, ${choice.text}`;

    changeBackground(scene);

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
      setEnding(nextNationScore >= nextEmotionScore ? "great" : "lonely");

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text:
            nextNationScore >= nextEmotionScore
              ? "👑 Great Founder. 당신은 나라와 백성, 미래의 안정을 우선했다."
              : "💔 Lonely Father. 당신은 가족과 감정에 더 가까운 선택을 했다.",
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
    setBackgroundImage("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#24180f] px-6 py-6">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          isBgChanging ? "opacity-40" : "opacity-100"
        }`}
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : "linear-gradient(135deg, #4b2e18, #1f2937)",
        }}
      />

      <div className="absolute inset-0 bg-black/45" />

      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 lg:grid-cols-[330px_1fr]">
        <aside className="rounded-3xl border border-white/30 bg-[#fff7e8]/90 p-6 shadow-2xl backdrop-blur-md">
          <p className="text-sm font-black tracking-widest text-[#9b3f34]">
            HISTOUR
          </p>

          <div className="mt-5 rounded-3xl bg-[#ead9bf] p-5 text-center">
            <div className="text-6xl">👑</div>
            <h1 className="mt-3 text-2xl font-black">태조 이성계</h1>
            <p className="mt-1 text-sm text-gray-600">조선의 건국자</p>
          </div>

          <div className="mt-6 space-y-4 text-sm">
            <div>
              <p className="text-gray-500">현재 시대</p>
              <p className="font-bold">1392년, 고려 말</p>
            </div>

            <div>
              <p className="text-gray-500">현재 상황</p>
              <p className="font-bold">새 왕조의 운명이 흔들리는 순간</p>
            </div>
          </div>

          <div className="mt-6 border-t border-[#d8c5aa] pt-5">
            <p className="font-black">진행률</p>
            <p className="mt-2 text-3xl font-black text-[#29366f]">
              {progress} / {MAX_PROGRESS}
            </p>

            <div className="mt-3 h-3 rounded-full bg-[#d8c5aa]">
              <div
                className="h-3 rounded-full bg-[#29366f]"
                style={{ width: `${(progress / MAX_PROGRESS) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 text-sm">
            <div className="rounded-2xl bg-white/60 p-4">
              <p className="font-bold">나라 중심 선택</p>
              <p className="mt-1 text-2xl font-black">{nationScore}</p>
            </div>

            <div className="rounded-2xl bg-white/60 p-4">
              <p className="font-bold">감정 중심 선택</p>
              <p className="mt-1 text-2xl font-black">{emotionScore}</p>
            </div>
          </div>

          {ending && (
            <div className="mt-6 rounded-2xl bg-[#1f2a44] p-4 text-white">
              <p className="text-sm opacity-70">ENDING</p>
              <p className="mt-2 text-xl font-black">
                {ending === "great" ? "👑 Great Founder" : "💔 Lonely Father"}
              </p>
            </div>
          )}
        </aside>

        <section className="rounded-3xl border border-white/30 bg-[#fff7e8]/90 p-6 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-[#d8c5aa] pb-4">
            <div>
              <h2 className="text-2xl font-black">태조 이성계와 대화하기</h2>
              <p className="mt-1 text-sm text-gray-600">
                선택에 따라 이야기와 배경이 바뀝니다.
              </p>
            </div>

            <button
              onClick={restart}
              className="rounded-full bg-[#29366f] px-4 py-2 text-sm font-bold text-white"
            >
              다시 시작
            </button>
          </div>

          <div className="mt-5 h-[56vh] space-y-5 overflow-y-auto rounded-3xl border border-[#d8c5aa] bg-white/40 p-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-3xl border p-4 shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#29366f] text-white"
                      : msg.role === "assistant"
                      ? "bg-white/90 text-[#1f2937]"
                      : "bg-[#ead9bf]/90 text-center text-[#374151]"
                  }`}
                >
                  <p className="mb-1 text-xs font-black opacity-70">
                    {msg.role === "user"
                      ? "나"
                      : msg.role === "assistant"
                      ? "태조 이성계"
                      : "Narration"}
                  </p>
                  <p className="whitespace-pre-line leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="max-w-[75%] rounded-3xl border bg-white/90 p-4 shadow-sm">
                태조 이성계가 생각 중입니다...
              </div>
            )}

            {isBgChanging && (
              <div className="mx-auto w-fit rounded-full bg-black/60 px-4 py-2 text-sm font-bold text-white">
                배경을 그리고 있습니다...
              </div>
            )}
          </div>

          {choices.length > 0 && !ending && (
            <div className="mt-5">
              <p className="mb-3 font-black text-[#9b3f34]">결정의 순간</p>

              <div className="grid gap-4 md:grid-cols-2">
                {choices.map((choice, index) => (
                  <button
                    key={`${choice.text}-${index}`}
                    onClick={() => handleChoice(choice)}
                    disabled={isLoading}
                    className="rounded-3xl border border-[#d7c6b4] bg-white/80 p-5 text-left font-bold shadow-md transition hover:scale-[1.02] hover:bg-[#29366f] hover:text-white disabled:opacity-60"
                  >
                    <p className="text-lg">{choice.text}</p>
                    <p className="mt-2 text-xs opacity-70">
                      이 선택은 다음 장면을 바꿉니다.
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!ending && (
            <div className="mt-5 flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="이성계에게 말을 걸어보세요..."
                className="flex-1 rounded-2xl border border-[#d7c6b4] bg-white/90 px-5 py-4 outline-none"
              />

              <button
                onClick={handleSend}
                disabled={isLoading}
                className="rounded-2xl bg-[#29366f] px-7 py-4 font-bold text-white disabled:opacity-50"
              >
                보내기
              </button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}