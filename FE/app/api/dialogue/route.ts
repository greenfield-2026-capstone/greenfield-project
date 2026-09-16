import { NextRequest, NextResponse } from "next/server";

import { stories } from "../../../data/stories";
import { characters } from "../../../data/characters";
import { buildDialoguePrompt } from "../../../lib/dialoguePrompt";


export async function POST(req: NextRequest) {
  try {
    // 1. 프론트에서 보낸 정보 받기
    const body = await req.json();

    const {
      storyId,
      turn,
      mode = "scene",
      history = [],
      selectedOption = null,
      affinity = 0,
    } = body;


    // 2. storyId / turn 확인
    if (!storyId || !turn) {
      return NextResponse.json(
        { error: "storyId와 turn이 필요합니다." },
        { status: 400 }
      );
    }


    // 3. 현재 스토리 찾기
    const story =
      stories[storyId as keyof typeof stories];

    if (!story) {
      return NextResponse.json(
        { error: "스토리를 찾을 수 없습니다." },
        { status: 404 }
      );
    }


    // 4. 현재 장면 찾기
    const scene =
      story.turns[turn as keyof typeof story.turns];

    if (!scene) {
      return NextResponse.json(
        { error: "장면을 찾을 수 없습니다." },
        { status: 404 }
      );
    }


    // 5. 현재 장면의 등장인물 정보 가져오기
    const characterData = scene.characters
      .map(
        (id) =>
          characters[id as keyof typeof characters]
      )
      .filter(Boolean);


    // 6. 우리가 만든 게임 규칙으로 프롬프트 생성
    const prompt = buildDialoguePrompt({
      story,
      scene,
      characterData,
      turn,
      mode,
      history,
      selectedOption,
      affinity,
    });


    // 7. BE의 게임용 AI API 호출
    const response = await fetch(
      "http://localhost:8000/api/dialogue",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // BE는 완성된 프롬프트만 받음
        body: JSON.stringify({
          prompt,
        }),
      }
    );


    // 8. BE 응답 받기
    const data = await response.json();


    // BE에서 오류가 발생한 경우
    if (!response.ok) {
      console.error("BE Dialogue Error:", data);

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


    // 9. 프론트로 결과 전달
    return NextResponse.json({
      ...data,

      meta: {
        storyId,
        turn,
        mode,
        background: scene.background,
      },
    });

  } catch (error) {
    console.error("Dialogue API Error:", error);

    return NextResponse.json(
      {
        error: "대화 생성 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}