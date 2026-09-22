import { NextRequest, NextResponse } from "next/server";
import { getCharacter, getPlace } from "@/lib/culture-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (typeof body.placeId !== "string" || typeof body.characterId !== "string" || typeof body.message !== "string" || !body.message.trim() || body.message.length > 4000) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }
    const place = getPlace(body.placeId);
    const character = getCharacter(body.placeId, body.characterId);
    if (!place || !character) return NextResponse.json({ error: "Character not found" }, { status: 404 });
    const history = Array.isArray(body.history) ? body.history.filter((item: any) => item && ["user", "assistant"].includes(item.role) && typeof item.text === "string").slice(-20).map((item: any) => ({ role: item.role, text: item.text.slice(0, 4000) })) : [];
    const base = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
    const response = await fetch(`${base.replace(/\/$/, "")}/api/chat/character`, {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(60000),
      body: JSON.stringify({ message: body.message.trim(), history, language: body.language === "en" ? "en" : "ko", character: { name: character.name, role: character.role, summary: character.summary, focusKeywords: character.focusKeywords }, place: { name: place.name, summary: place.summary, era: place.era, storyIntro: place.storyIntro } }),
    });
    if (!response.ok) return NextResponse.json({ error: "Chat unavailable" }, { status: 502 });
    const data = await response.json();
    if (typeof data.reply !== "string" || !data.reply.trim()) return NextResponse.json({ error: "Empty reply" }, { status: 502 });
    return NextResponse.json({ reply: data.reply });
  } catch {
    return NextResponse.json({ error: "Chat unavailable" }, { status: 503 });
  }
}
