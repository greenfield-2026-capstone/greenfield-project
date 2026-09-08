"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { IntroData } from "@/data/intro/sejong";

interface IntroSceneProps {
  data: IntroData;
  onComplete: () => void;
}

export default function IntroScene({
  data,
  onComplete,
}: IntroSceneProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [displayText, setDisplayText] = useState("");

  const [isTyping, setIsTyping] = useState(true);

  const [showChoices, setShowChoices] = useState(false);

  const currentDialogue = data.dialogues[currentIndex];

  // ============================
  // 타이핑 효과
  // ============================

  useEffect(() => {
    let index = 0;

    setDisplayText("");
    setIsTyping(true);
    setShowChoices(false);

    const timer = setInterval(() => {
      setDisplayText(
        currentDialogue.text.slice(0, index + 1)
      );

      index++;

      if (index >= currentDialogue.text.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [currentIndex, currentDialogue.text]);

  // ============================
  // 화면 클릭
  // ============================

  const handleNext = () => {
    // 타이핑 중이면 전체 대사 표시
    if (isTyping) {
      setDisplayText(currentDialogue.text);
      setIsTyping(false);
      return;
    }

    // 마지막 대사
    if (currentIndex === data.dialogues.length - 1) {
      setShowChoices(true);
      return;
    }

    // 다음 대사
    setCurrentIndex((prev) => prev + 1);
  };

  // ============================
  // 선택지 클릭
  // ============================

  const handleChoice = () => {
    onComplete();
  };

  return (
    <main
      className="relative h-screen w-full overflow-hidden bg-black select-none"
      onClick={handleNext}
    >
      {/* =================================
          배경
      ================================= */}

      <Image
        src={data.background}
        alt="궁궐 배경"
        fill
        priority
        className="object-cover"
      />

      {/* 배경 어둡게 */}
      <div className="absolute inset-0 bg-black/20" />

      {/* =================================
          캐릭터
      ================================= */}

      {currentDialogue.character && (
        <div
          className={`
            absolute
            bottom-[17%]
            z-10
            h-[75%]
            w-[500px]

            ${
              currentDialogue.position === "left"
                ? "left-[10%]"
                : currentDialogue.position === "right"
                ? "right-[10%]"
                : "left-1/2 -translate-x-1/2"
            }
          `}
        >
          <Image
            src={currentDialogue.character}
            alt={currentDialogue.speaker}
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>
      )}

      {/* =================================
          상단 타이틀
      ================================= */}

      <div className="absolute left-6 top-6 z-30">
        <p className="text-sm tracking-widest text-white/70">
          HISTOUR
        </p>

        <h1 className="mt-1 text-xl font-bold text-white">
          {data.kingName}
        </h1>
      </div>

      {/* =================================
          진행도
      ================================= */}

      {!showChoices && (
        <div className="absolute right-6 top-6 z-30">
          <div className="rounded-full bg-black/40 px-4 py-2 text-sm text-white backdrop-blur">
            {currentIndex + 1} / {data.dialogues.length}
          </div>
        </div>
      )}

      {/* =================================
          대화창
      ================================= */}

      {!showChoices && (
        <div
          className="
            absolute
            bottom-6
            left-1/2
            z-20
            w-[92%]
            max-w-5xl
            -translate-x-1/2
          "
        >
          {/* 이름표 */}

          <div
            className="
              relative
              z-10
              ml-8
              w-fit
              rounded-t-xl
              bg-[#39291f]
              px-8
              py-3
              shadow-lg
            "
          >
            <span className="text-lg font-bold text-white">
              {currentDialogue.speaker}
            </span>
          </div>

          {/* 말풍선 */}

          <div
            className="
              relative
              -mt-1
              min-h-[160px]
              rounded-2xl
              border-2
              border-white/70
              bg-white/90
              px-10
              py-8
              shadow-2xl
              backdrop-blur-sm
            "
          >
            <p className="text-lg leading-relaxed text-[#30251e] md:text-xl">
              {displayText}

              {isTyping && (
                <span className="ml-1 animate-pulse">
                  ▌
                </span>
              )}
            </p>

            {/* 다음 화살표 */}

            {!isTyping && (
              <span
                className="
                  absolute
                  bottom-4
                  right-6
                  animate-bounce
                  text-gray-500
                "
              >
                ▼
              </span>
            )}
          </div>
        </div>
      )}

      {/* =================================
          선택지
      ================================= */}

      {showChoices && data.choices && (
        <div
          className="
            absolute
            inset-0
            z-40
            flex
            items-center
            justify-center
            bg-black/40
          "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-[90%] max-w-2xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              어떻게 대답하시겠습니까?
            </h2>

            <div className="space-y-4">
              {data.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={handleChoice}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/40
                    bg-white/90
                    px-8
                    py-5
                    text-lg
                    font-medium
                    text-[#30251e]
                    shadow-xl
                    transition
                    hover:scale-[1.02]
                    hover:bg-white
                    active:scale-[0.98]
                  "
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================
          클릭 안내
      ================================= */}

      {!showChoices && (
        <p
          className="
            absolute
            bottom-2
            right-6
            z-30
            text-xs
            text-white/70
          "
        >
          화면을 클릭하세요
        </p>
      )}
    </main>
  );
}