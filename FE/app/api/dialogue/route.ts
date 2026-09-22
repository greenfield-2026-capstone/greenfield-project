import { NextRequest, NextResponse } from "next/server";

import { stories } from "../../../data/stories";
import { characters } from "../../../data/characters";
import { buildDialoguePrompt } from "../../../lib/dialoguePrompt";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      storyId,
      turn,
      mode,
      history = [],
      selectedOption = null,
      affinity = 0,
    } = body;


    // =========================================================
    // 기본 값 확인
    // =========================================================

    if (!storyId || !turn) {
      return NextResponse.json(
        {
          error: "storyId와 turn이 필요합니다.",
        },
        {
          status: 400,
        }
      );
    }


    // =========================================================
    // AI가 할 수 있는 역할 제한
    // =========================================================

    if (
      mode !== "choices" &&
      mode !== "reaction"
    ) {
      return NextResponse.json(
        {
          error:
            "mode는 choices 또는 reaction이어야 합니다.",
        },
        {
          status: 400,
        }
      );
    }


    // =========================================================
    // Story 찾기
    // =========================================================

    const story =
      stories[
        storyId as keyof typeof stories
      ];


    if (!story) {
      return NextResponse.json(
        {
          error:
            "스토리를 찾을 수 없습니다.",
        },
        {
          status: 404,
        }
      );
    }


    // =========================================================
    // 현재 Turn 찾기
    // =========================================================

    const scene =
      story.turns[
        turn as keyof typeof story.turns
      ];


    if (!scene) {
      return NextResponse.json(
        {
          error:
            "장면을 찾을 수 없습니다.",
        },
        {
          status: 404,
        }
      );
    }


    // =========================================================
    // 등장인물 정보
    // =========================================================

    const characterData =
      scene.characters
        .map(
          (id) =>
            characters[
              id as keyof typeof characters
            ]
        )
        .filter(Boolean);


    // =========================================================
    // Prompt 생성
    // =========================================================

    const prompt =
      buildDialoguePrompt({
        story,
        scene,
        characterData,
        turn,
        mode,
        history,
        selectedOption,
        affinity,
      });


    // =========================================================
    // Python FastAPI → LiteLLM
    // =========================================================

    const backendUrl =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://histour-be.vercel.app";

const response = await fetch(
  `${backendUrl}/api/dialogue`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      storyId,
      turn,
    }),
  }
);


    const data =
      await response.json();


    // =========================================================
    // BE 오류
    // =========================================================

    if (!response.ok) {
      console.error(
        "BE Dialogue Error:",
        data
      );

      return NextResponse.json(
        {
          error:
            data?.detail ??
            "AI 대화 생성에 실패했습니다.",
        },
        {
          status: response.status,
        }
      );
    }


    // =========================================================
    // FE로 전달
    // =========================================================

    return NextResponse.json({
      ...data,

      meta: {
        storyId,
        turn,
        mode,
        background:
          scene.background,
      },
    });

  } catch (error) {
    console.error(
      "Dialogue API Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "대화 생성 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}