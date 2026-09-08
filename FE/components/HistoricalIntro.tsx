"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface Dialogue {
  speaker: string;
  text: string;
  image?: string;
  position?: "left" | "center" | "right";
}

interface HistoricalIntroProps {
  kingName: string;
  background: string;
  dialogues: Dialogue[];
  onComplete: () => void;
}

export default function HistoricalIntro({
  kingName,
  background,
  dialogues,
  onComplete,
}: HistoricalIntroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const currentDialogue = dialogues[currentIndex];

  // 타이핑 효과
  useEffect(() => {
    let index = 0;

    setText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      setText(currentDialogue.text.slice(0, index + 1));
      index++;

      if (index >= currentDialogue.text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentIndex, currentDialogue.text]);

  // 화면 클릭
  const handleClick = () => {
    // 타이핑 중이면 전체 대사 보여주기
    if (isTyping) {
      setText(currentDialogue.text);
      setIsTyping(false);
      return;
    }

    // 마지막 대사면 종료
    if (currentIndex === dialogues.length - 1) {
      onComplete();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <main
      className="relative h-screen w-full overflow-hidden bg-black"
      onClick={handleClick}
    >
      {/* ================= 배경 ================= */}
      <Image
        src={background}
        alt="background"
        fill
        priority
        className="object-cover"
      />

      {/* 화면 살짝 어둡게 */}
      <div className="absolute inset-0 bg-black/15" />

      {/* ================= 캐릭터 ================= */}
      {currentDialogue.image && (
        <div
          className={`
            absolute bottom-[18%] z-10
            h-[72%] w-[520px]
            ${
              currentDialogue.position === "left"
                ? "left-[15%]"
                : currentDialogue.position === "right"
                ? "right-[15%]"
                : "left-1/2 -translate-x-1/2"
            }
          `}
        >
          <Image
            src={currentDialogue.image}
            alt={currentDialogue.speaker}
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      )}

      {/* ================= 대화창 ================= */}
      <div className="absolute bottom-6 left-1/2 z-20 w-[92%] max-w-6xl -translate-x-1/2">
        {/* 이름 */}
        <div className="relative z-10 ml-8 w-fit rounded-t-xl bg-[#3b2a20] px-8 py-3">
          <span className="text-lg font-bold text-white">
            {currentDialogue.speaker}
          </span>
        </div>

        {/* 대화창 */}
        <div className="-mt-1 min-h-[155px] rounded-2xl border-2 border-white/70 bg-white/90 px-10 py-8 shadow-2xl backdrop-blur">
          <p className="text-lg leading-relaxed text-[#30251e] md:text-xl">
            {text}

            {isTyping && (
              <span className="ml-1 animate-pulse">▌</span>
            )}
          </p>

          {/* 다음 표시 */}
          {!isTyping && (
            <div className="absolute bottom-5 right-8 animate-bounce text-gray-500">
              ▼
            </div>
          )}
        </div>
      </div>

      {/* ================= 진행도 ================= */}
      <div className="absolute right-6 top-6 z-30 rounded-full bg-black/40 px-4 py-2 text-sm text-white">
        {currentIndex + 1} / {dialogues.length}
      </div>

      {/* 클릭 안내 */}
      <div className="absolute bottom-2 right-6 z-30 text-xs text-white/70">
        클릭하여 계속하기
      </div>
    </main>
  );
}