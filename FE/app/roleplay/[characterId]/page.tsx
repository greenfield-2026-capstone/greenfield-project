"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { stories } from "../../../data/stories";
import styles from "./roleplay.module.css";

type Line = {
  speaker: string;
  emotion: string | null;
  text: string;
};

type Option = {
  id: number;
  type: "supportive" | "playful" | "curious" | "challenging";
  text: string;
  affinity_score: number;
};

type ApiResponse = {
  dialogue?: Line[];
  options?: Option[];
  error?: string;
};

const names: Record<string, string> = {
  sejong: "세종대왕",
  young_sejong: "어린 세종",
  taejong: "태종",
  kimmun: "신하 김문",
  narration: "",
};

function getCharacterImage(speaker: string, emotion: string | null) {
  if (!emotion) return null;

  if (speaker === "sejong" || speaker === "young_sejong")
    return `/images/sejong/characters/${emotion}.png`;

  if (speaker === "taejong")
    return `/images/taejong/${emotion}.png`;

  if (speaker === "kimmun")
    return `/images/kimmun/${emotion}.png`;

  return null;
}

export default function RoleplayPage() {
  const { characterId } = useParams<{ characterId: string }>();
  const story = stories[characterId as keyof typeof stories];

  const [turn, setTurn] = useState(1);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [phase, setPhase] = useState<"script" | "choices" | "reaction" | "transition">("script");

  const [affinity, setAffinity] = useState(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [reaction, setReaction] = useState<Line | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scene = story?.turns[turn as keyof typeof story.turns] as any;
  const script: Line[] = scene?.script ?? [];
  const currentLine = script[scriptIndex];
  const activeLine = phase === "reaction" ? reaction : currentLine;

  const fullText = activeLine?.text ?? "";
  const speakerName = activeLine ? names[activeLine.speaker] ?? activeLine.speaker : "";
  const characterImage = activeLine
    ? getCharacterImage(activeLine.speaker, activeLine.emotion)
    : null;

  const backgroundImage = scene
    ? `/images/${characterId}/backgrounds/${scene.background}.png`
    : "";

  // 대사 타이핑
  useEffect(() => {
    if (!fullText) return;

    setTypedText("");
    setIsTyping(true);

    let index = 0;

    const timer = window.setInterval(() => {
      index++;
      setTypedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [fullText]);

  // 인물이 바뀌면 게임 초기화
  useEffect(() => {
    setTurn(1);
    setScriptIndex(0);
    setPhase("script");
    setAffinity(0);
    setOptions([]);
    setReaction(null);
    setHistory([]);
    setError("");
  }, [characterId]);

  // 선택지 생성
  async function loadChoices() {
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/dialogue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId: characterId,
          turn,
          mode: "choices",
          history,
          affinity,
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) throw new Error(data.error || "선택지를 생성하지 못했습니다.");
      if (!data.options?.length) throw new Error("AI가 선택지를 반환하지 않았습니다.");

      setOptions(data.options);
      setPhase("choices");
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  // 대사창 클릭
  function nextDialogue() {
    if (loading) return;

    // 타이핑 중이면 문장 전체 표시
    if (isTyping) {
      setTypedText(fullText);
      setIsTyping(false);
      return;
    }

    if (phase !== "script") return;

    // 다음 고정 대사
    if (scriptIndex < script.length - 1) {
      setScriptIndex((i) => i + 1);
      return;
    }

    // 고정 대본 종료 → AI 선택지
    loadChoices();
  }

  // 선택지 클릭 → AI 반응
  async function selectOption(option: Option) {
    if (loading) return;

    const nextAffinity = affinity + option.affinity_score;

    const newHistory = [
      ...history,
      {
        role: "player",
        text: option.text,
        type: option.type,
        affinity_score: option.affinity_score,
      },
    ];

    setAffinity(nextAffinity);
    setHistory(newHistory);
    setOptions([]);
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dialogue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId: characterId,
          turn,
          mode: "reaction",
          selectedOption: option,
          history: newHistory,
          affinity: nextAffinity,
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) throw new Error(data.error || "반응을 생성하지 못했습니다.");

      const npcReaction = data.dialogue?.[0];
      if (!npcReaction) throw new Error("AI가 반응을 반환하지 않았습니다.");

      setReaction(npcReaction);
      setHistory((prev) => [
        ...prev,
        {
          role: "character",
          speaker: npcReaction.speaker,
          text: npcReaction.text,
        },
      ]);

      setPhase("reaction");
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  // 다음 Turn
  function nextTurn() {
  const next = turn + 1;
  const nextScene = story.turns[next as keyof typeof story.turns] as any;

  if (!nextScene) {
    setTurn(next);
    return;
  }

  setPhase("transition");
  setReaction(null);

  setTimeout(() => {
    setTurn(next);
    setScriptIndex(0);
    setOptions([]);
    setPhase("script");
    setError("");
  }, 2200);
}

  if (!story)
    return <main className={styles.messageScreen}>스토리를 찾을 수 없습니다.</main>;

  if (!scene)
    return <main className={styles.messageScreen}>이야기가 종료되었습니다.</main>;
  
  const nextScene = story.turns[(turn + 1) as keyof typeof story.turns] as any;
  return (
    <main
      className={styles.game}
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      <div className={styles.overlay} />

      {/* 상단 */}
      <header className={styles.header}>
        <div>
          <div className={styles.logo}>HISTOUR</div>
          <div className={styles.storyTitle}>{story.title}</div>
        </div>

        <div className={styles.turn}>
          {turn} / {Object.keys(story.turns).length}
        </div>
      </header>

      {/* 캐릭터 */}
      {characterImage && (
        <img
          key={`${activeLine?.speaker}-${activeLine?.emotion}-${scriptIndex}`}
          src={characterImage}
          alt={speakerName}
          className={styles.character}
        />
      )}

      {/* 선택지 */}
      {phase === "choices" && !loading && (
        <section className={styles.choices}>
          <div className={styles.choiceTitle}>어떻게 대답할까?</div>

          {options.map((option, index) => (
            <button
              key={option.id}
              className={styles.choice}
              style={{ animationDelay: `${index * 90}ms` }}
              onClick={() => selectOption(option)}
            >
              <span className={styles.choiceNumber}>{index + 1}</span>
              {option.text}
            </button>
          ))}
        </section>
      )}

      {/* 대사창 */}
      {phase !== "choices" && activeLine && (
        <section className={styles.dialogueBox} onClick={nextDialogue}>
          {speakerName && (
            <div className={styles.nameTag}>{speakerName}</div>
          )}

          <div className={styles.dialogueText}>
            {typedText}
            {isTyping && <span className={styles.cursor} />}
          </div>

          {phase === "script" && !isTyping && (
            <div className={styles.nextIndicator}>▼</div>
          )}

          {phase === "reaction" && !isTyping && (
            <button
              className={styles.nextTurn}
              onClick={(e) => {
                e.stopPropagation();
                nextTurn();
              }}
            >
              다음 이야기 →
            </button>
          )}
        </section>
      )}

      {/* AI 로딩 */}
      {loading && (
        <div className={styles.loading}>
          <span className={styles.loadingDot}>·</span>
          <span className={styles.loadingDot}>·</span>
          <span className={styles.loadingDot}>·</span>
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}
    
    {/* 챕터 전환 */}
      {phase === "transition" && (
        <div className={styles.chapterTransition}>
          <div className={styles.transitionContent}>
            <div className={styles.transitionTitle}>
              {nextScene?.transition?.title ?? "시간이 흐르고..."}
            </div>

            {nextScene?.transition?.text && (
              <div className={styles.transitionText}>
                {nextScene.transition.text}
              </div>
            )}
          </div>
        </div>
      )}
      
    </main>
  );
}