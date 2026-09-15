"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type DialogueLine = {
  speaker: string;
  emotion: string;
  text: string;
};

type DialogueOption = {
  id: number;
  type: "supportive" | "playful" | "curious" | "challenging";
  text: string;
  affinity_score: number;
};

type DialogueResponse = {
  dialogue: DialogueLine[];
  options?: DialogueOption[];

  meta?: {
    storyId: string;
    turn: number;
    mode: "scene" | "reaction";
    background: string;
  };

  error?: string;
};

export default function RoleplayPage() {
  const params = useParams();

  // /roleplay/sejong → "sejong"
  // /roleplay/gojong → "gojong"
  const characterId = params.characterId as string;

  const [turn, setTurn] = useState(1);
  const [affinity, setAffinity] = useState(0);

  const [dialogue, setDialogue] = useState<DialogueLine[]>([]);
  const [options, setOptions] = useState<DialogueOption[]>([]);

  const [history, setHistory] = useState<any[]>([]);

  const [background, setBackground] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ==========================================
  // Turn 시작
  // ==========================================

  async function loadScene(currentTurn: number) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/dialogue", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          storyId: characterId,
          turn: currentTurn,
          mode: "scene",
          history,
          affinity,
        }),
      });

      const data: DialogueResponse =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "대화를 생성하지 못했습니다."
        );
      }

      setDialogue(data.dialogue ?? []);
      setOptions(data.options ?? []);

      if (data.meta?.background) {
        setBackground(data.meta.background);
      }
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  }


  // ==========================================
  // 선택지 클릭
  // ==========================================

  async function selectOption(option: DialogueOption) {
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      // 선택한 점수까지 포함한 새로운 호감도
      const nextAffinity =
        affinity + option.affinity_score;

      setAffinity(nextAffinity);

      // 플레이어가 선택한 문장도 기록
      const newHistory = [
        ...history,

        {
          role: "player",
          text: option.text,
          type: option.type,
          affinity_score: option.affinity_score,
        },
      ];

      setHistory(newHistory);

      // 선택지는 클릭하자마자 숨김
      setOptions([]);

      const response = await fetch("/api/dialogue", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          storyId: characterId,
          turn,
          mode: "reaction",

          selectedOption: option,

          history: newHistory,

          affinity: nextAffinity,
        }),
      });

      const data: DialogueResponse =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "반응을 생성하지 못했습니다."
        );
      }

      // 기존 대사 뒤에 반응 추가
      setDialogue((previous) => [
        ...previous,

        // 플레이어 선택 대사
        {
          speaker: "player",
          emotion: "neutral",
          text: option.text,
        },

        ...(data.dialogue ?? []),
      ]);

      // AI 반응도 history에 저장
      setHistory((previous) => [
        ...previous,

        ...(data.dialogue ?? []).map((line) => ({
          role: "character",
          speaker: line.speaker,
          text: line.text,
        })),
      ]);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  }


  // ==========================================
  // 다음 Turn
  // ==========================================

  async function nextTurn() {
    const next = turn + 1;

    setTurn(next);

    setDialogue([]);
    setOptions([]);

    await loadScene(next);
  }


  // ==========================================
  // 페이지 들어오면 Turn 1 자동 시작
  // ==========================================

  useEffect(() => {
    if (!characterId) return;

    loadScene(1);

    // 첫 진입 때만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);


  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* ============================= */}
      {/* 테스트용 상태 표시 */}
      {/* ============================= */}

      <div
        style={{
          marginBottom: "30px",
          paddingBottom: "20px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h1>역사 Roleplay 테스트</h1>

        <p>
          인물: <strong>{characterId}</strong>
        </p>

        <p>
          Turn: <strong>{turn}</strong>
        </p>

        <p>
          호감도: <strong>{affinity}</strong>
        </p>

        {background && (
          <p>
            배경: <strong>{background}</strong>
          </p>
        )}
      </div>


      {/* ============================= */}
      {/* 오류 */}
      {/* ============================= */}

      {error && (
        <div
          style={{
            padding: "15px",
            marginBottom: "20px",
            color: "red",
            border: "1px solid red",
          }}
        >
          {error}
        </div>
      )}


      {/* ============================= */}
      {/* 대사 */}
      {/* ============================= */}

      <section>
        {dialogue.map((line, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <strong>
              {line.speaker}
            </strong>

            {line.speaker !== "player" && (
              <span
                style={{
                  marginLeft: "10px",
                  color: "#777",
                }}
              >
                {line.emotion}
              </span>
            )}

            <p
              style={{
                marginBottom: 0,
              }}
            >
              {line.text}
            </p>
          </div>
        ))}
      </section>


      {/* ============================= */}
      {/* 선택지 */}
      {/* ============================= */}

      {!loading && options.length > 0 && (
        <section
          style={{
            marginTop: "30px",
          }}
        >
          <h2>어떻게 대답할까?</h2>

          {options.map((option) => (
            <button
              key={option.id}
              onClick={() =>
                selectOption(option)
              }
              style={{
                display: "block",
                width: "100%",
                padding: "15px",
                marginBottom: "10px",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {option.text}

              <span
                style={{
                  marginLeft: "10px",
                  opacity: 0.6,
                }}
              >
                ({option.type} / {option.affinity_score >= 0 ? "+" : ""}
                {option.affinity_score})
              </span>
            </button>
          ))}
        </section>
      )}


      {/* ============================= */}
      {/* 로딩 */}
      {/* ============================= */}

      {loading && (
        <p
          style={{
            marginTop: "30px",
          }}
        >
          AI가 대사를 생성하고 있습니다...
        </p>
      )}


      {/* ============================= */}
      {/* 선택 후 다음 Turn */}
      {/* ============================= */}

      {!loading &&
        dialogue.length > 0 &&
        options.length === 0 && (
          <button
            onClick={nextTurn}
            style={{
              marginTop: "30px",
              padding: "12px 24px",
              cursor: "pointer",
            }}
          >
            다음 이야기 →
          </button>
        )}
    </main>
  );
}