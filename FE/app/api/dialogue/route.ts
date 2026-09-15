import {
  NextRequest,
  NextResponse,
} from "next/server";

import { stories } from "@/data/stories";
import { characters } from "@/data/characters";
import { buildDialoguePrompt } from "@/lib/dialoguePrompt";


export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const {
      storyId,
      turn,
      mode = "scene",
      history = [],
      selectedOption = null,
      affinity = 0,
    } = body;


    // ========================================
    // 기본 요청 검사
    // ========================================

    if (!storyId || !turn) {
      return NextResponse.json(
        {
          error:
            "storyId and turn are required",
        },
        {
          status: 400,
        }
      );
    }


    if (
      mode !== "scene" &&
      mode !== "reaction"
    ) {
      return NextResponse.json(
        {
          error: "Invalid mode",
        },
        {
          status: 400,
        }
      );
    }


    // ========================================
    // Story 가져오기
    // ========================================

    const story =
      stories[
        storyId as keyof typeof stories
      ];

    if (!story) {
      return NextResponse.json(
        {
          error: "Story not found",
        },
        {
          status: 404,
        }
      );
    }


    // ========================================
    // Turn 가져오기
    // ========================================

    const scene =
      story.turns[
        turn as keyof typeof story.turns
      ];

    if (!scene) {
      return NextResponse.json(
        {
          error: "Turn not found",
        },
        {
          status: 404,
        }
      );
    }


    // ========================================
    // 등장인물 정보 가져오기
    // ========================================

    const characterData =
      scene.characters
        .map((characterId) => {
          return characters[
            characterId as keyof typeof characters
          ];
        })
        .filter(Boolean);


    // ========================================
    // Prompt 만들기
    // ========================================

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


    // ========================================
    // LiteLLM 호출
    // ========================================

    const baseUrl =
      process.env.LITELLM_BASE_URL;

    const apiKey =
      process.env.LITELLM_API_KEY;

    const model =
      process.env.LITELLM_MODEL;


    if (!baseUrl || !apiKey || !model) {
      console.error(
        "LiteLLM environment variables are missing"
      );

      return NextResponse.json(
        {
          error:
            "LiteLLM configuration missing",
        },
        {
          status: 500,
        }
      );
    }


    const response = await fetch(
      `${baseUrl}/chat/completions`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${apiKey}`,
        },

        body: JSON.stringify({
          model,

          messages: [
            {
              role: "system",
              content: prompt,
            },
          ],

          temperature: 0.85,

          response_format: {
            type: "json_object",
          },
        }),
      }
    );


    // ========================================
    // LiteLLM 오류
    // ========================================

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "LiteLLM Error:",
        response.status,
        errorText
      );

      return NextResponse.json(
        {
          error:
            "LiteLLM request failed",
        },
        {
          status: 500,
        }
      );
    }


    const data =
      await response.json();


    const content =
      data?.choices?.[0]
        ?.message?.content;


    if (!content) {
      throw new Error(
        "LiteLLM returned empty content"
      );
    }


    // ========================================
    // JSON 파싱
    // ========================================

    let result;

    try {
      result = JSON.parse(content);
    } catch {
      console.error(
        "Invalid AI JSON:",
        content
      );

      return NextResponse.json(
        {
          error:
            "AI returned invalid JSON",
        },
        {
          status: 500,
        }
      );
    }


    // ========================================
    // 호감도 서버 안전장치
    // ========================================

    if (
      mode === "scene" &&
      Array.isArray(result.options)
    ) {
      result.options =
        result.options.map(
          (option: any) => {
            let score =
              Number(
                option.affinity_score
              );

            if (
              Number.isNaN(score)
            ) {
              score = 0;
            }

            // 절대 -5 아래로 못 내려감
            score = Math.max(
              -5,
              score
            );

            // 절대 +20 위로 못 올라감
            score = Math.min(
              20,
              score
            );

            return {
              ...option,
              affinity_score: score,
            };
          }
        );
    }


    // ========================================
    // 응답
    // ========================================

    return NextResponse.json({
      ...result,

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
          "Failed to generate dialogue",
      },
      {
        status: 500,
      }
    );
  }
}