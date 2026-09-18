import { NextRequest, NextResponse } from "next/server";
import { stories } from "../../../data/stories";
import { characters } from "../../../data/characters";
import { buildDialoguePrompt } from "../../../lib/dialoguePrompt";

export const runtime = "nodejs";
export const maxDuration = 60;

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: NextRequest) {
  let body;
  try { body = await req.json(); }
  catch { return fail("올바른 JSON 요청이 필요합니다.", 400); }
  if (!body || typeof body !== "object") return fail("요청이 올바르지 않습니다.", 400);
  const { storyId, turn, mode, history = [], selectedOption = null, affinity = 0 } = body;
  if (typeof storyId !== "string" || !Number.isInteger(turn) || turn < 1 ||
      !["choices", "reaction"].includes(mode) || !Array.isArray(history) ||
      history.length > 100 || !Number.isFinite(affinity)) {
    return fail("스토리, 장면 또는 요청 형식이 올바르지 않습니다.", 400);
  }
  if (mode === "reaction" && (!selectedOption || typeof selectedOption.text !== "string" || !selectedOption.text.trim())) {
    return fail("선택한 답변이 필요합니다.", 400);
  }
  if (!Object.hasOwn(stories, storyId)) return fail("스토리를 찾을 수 없습니다.", 404);
  const story = stories[storyId as keyof typeof stories];
  const scene = story.turns[turn as keyof typeof story.turns];
  if (!scene) return fail("장면을 찾을 수 없습니다.", 404);

  // Server-only settings: never expose the API key through NEXT_PUBLIC_*.
  const base = process.env.LITELLM_URL?.trim();
  const apiKey = process.env.LITELLM_API_KEY?.trim();
  const model = process.env.LITELLM_MODEL?.trim();
  if (!base || !apiKey || !model) {
    console.error("Dialogue configuration missing:", [!base && "LITELLM_URL", !apiKey && "LITELLM_API_KEY", !model && "LITELLM_MODEL"].filter(Boolean));
    return fail("게임 AI 연결이 아직 설정되지 않았습니다. 관리자에게 문의해 주세요.", 503);
  }
  let endpoint: URL;
  try {
    // Accept either a proxy root or an OpenAI-compatible /v1 base URL.
    const url = base.replace(/\/+$/, "");
    endpoint = new URL(`${url.endsWith("/v1") ? url : `${url}/v1`}/chat/completions`);
    if (!["http:", "https:"].includes(endpoint.protocol) || endpoint.origin === new URL(req.url).origin) throw new Error("Invalid endpoint");
  } catch { return fail("게임 AI 서버 주소 설정을 확인해 주세요.", 503); }

  const characterData = scene.characters.map(id => characters[id as keyof typeof characters]).filter(Boolean);
  const prompt = buildDialoguePrompt({ story, scene, characterData, turn, mode, history, selectedOption, affinity });
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(45000),
      body: JSON.stringify({ model, messages: [
        { role: "system", content: prompt },
        { role: "user", content: "위 게임 규칙과 현재 장면을 따라 요청된 결과를 생성하라. 반드시 JSON 형식으로만 응답하라." },
      ], temperature: 0.8 }),
    });
    if (!response.ok) {
      console.error("Dialogue provider status:", response.status);
      return fail("AI 응답을 받지 못했습니다. 잠시 후 다시 시도해 주세요.", 502);
    }
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (typeof content !== "string") throw new Error("Invalid content");
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    if (start < 0 || end < start) throw new Error("Missing JSON");
    const result = JSON.parse(content.slice(start, end + 1));
    if (mode === "choices") {
      const options = result.options;
      const types = ["supportive", "playful", "curious", "challenging"];
      if (!Array.isArray(options) || options.length !== 4 || options.some(o =>
        !o || !Number.isInteger(o.id) || !types.includes(o.type) || typeof o.text !== "string" || !o.text.trim() || !Number.isFinite(o.affinity_score)
      ) || new Set(options.map(o => o.id)).size !== 4 || new Set(options.map(o => o.type)).size !== 4) throw new Error("Invalid options");
      return NextResponse.json({ options, meta: { storyId, turn, mode, background: scene.background } });
    }
    const line = result.dialogue?.[0];
    const speaker = characterData.find(c => c.id === line?.speaker);
    if (!Array.isArray(result.dialogue) || result.dialogue.length !== 1 || !speaker ||
        typeof line.text !== "string" || !line.text.trim() ||
        (line.emotion !== null && !(speaker.emotions as readonly string[]).includes(line.emotion))) throw new Error("Invalid dialogue");
    return NextResponse.json({ dialogue: result.dialogue, meta: { storyId, turn, mode, background: scene.background } });
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    console.error("Dialogue request failed:", timedOut ? "timeout" : "provider or response error");
    return fail(timedOut ? "응답이 지연되고 있습니다. 다시 시도해 주세요." : "AI 응답을 처리하지 못했습니다. 다시 시도해 주세요.", timedOut ? 504 : 502);
  }
}
