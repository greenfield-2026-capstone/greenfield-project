import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { getCharacter, getPlace } from "@/lib/culture-data";
import { historyCookie, readHistorySession } from "@/lib/historySession";
import { normalizeLocale } from "@/lib/locale";
import type { Conversation } from "@/lib/accountHistory";

function database() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

function account(request: NextRequest) {
  const session = readHistorySession(request.cookies.get(historyCookie)?.value);
  return session && encodeURIComponent(session.email) === request.headers.get("x-histour-account") ? session : null;
}

function unavailable(status: number) {
  return NextResponse.json({ error: "Conversation sync unavailable" }, { status });
}

export async function GET(request: NextRequest) {
  const user = account(request);
  if (!user) return unavailable(401);
  const db = database();
  if (!db) return unavailable(503);
  const { data, error } = await db.from("chat_logs").select("messages").eq("user_id", user.id);
  if (error) return unavailable(502);
  return NextResponse.json({
    conversations: data.map(row => row.messages).filter(value => value && Array.isArray(value.messages)),
  }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: NextRequest) {
  const user = account(request);
  if (!user) return unavailable(401);
  const db = database();
  if (!db) return unavailable(503);
  const body = await request.json().catch(() => null);
  const messages: unknown = body?.messages;
  if (!body || typeof body.placeId !== "string" || typeof body.characterId !== "string" ||
    !Array.isArray(messages) || !messages.length || messages.length > 500 ||
    !messages.every((message): message is Conversation["messages"][number] =>
      message && (message.role === "user" || message.role === "assistant") &&
      typeof message.text === "string" && message.text.length <= 16000)) return unavailable(400);

  const place = getPlace(body.placeId);
  const character = getCharacter(body.placeId, body.characterId);
  if (!place || !character) return unavailable(400);
  const lang = normalizeLocale(body.lang);
  const storyId = [place.id, character.id, lang].join("/");
  const hash = createHash("sha256").update(user.id + ":" + storyId).digest("hex");
  const id = [hash.slice(0, 8), hash.slice(8, 12), "8" + hash.slice(13, 16), "8" + hash.slice(17, 20), hash.slice(20, 32)].join("-");
  const now = Date.now();
  const savedTime = typeof body.updatedAt === "string" ? Date.parse(body.updatedAt) : NaN;
  const conversation: Conversation = {
    placeId: place.id, characterId: character.id, lang,
    placeName: typeof body.placeName === "string" ? body.placeName.slice(0, 120) : place.name,
    characterName: typeof body.characterName === "string" ? body.characterName.slice(0, 120) : character.name,
    messages: messages.map(({ role, text }) => ({ role, text })),
    updatedAt: new Date(Number.isFinite(savedTime) ? Math.min(savedTime, now) : now).toISOString(),
  };
  const row = { id, user_id: user.id, story_id: storyId, character_name: character.name, messages: conversation };
  const { data: previous, error: readError } = await db.from("chat_logs")
    .select("messages").eq("id", id).eq("user_id", user.id).maybeSingle();
  if (readError) return unavailable(502);
  if (previous) {
    const before = previous.messages.messages;
    if (!Array.isArray(before) || before.length > conversation.messages.length ||
      !before.every((message, index) => message.role === conversation.messages[index].role &&
        message.text === conversation.messages[index].text)) return unavailable(409);
    const { data, error } = await db.from("chat_logs").update({ messages: conversation })
      .eq("id", id).eq("user_id", user.id).eq("messages", JSON.stringify(previous.messages)).select("id");
    if (error) return unavailable(502);
    if (!data.length) return unavailable(409);
  } else {
    const { error } = await db.from("chat_logs").insert(row);
    if (error) return unavailable(error.code === "23505" ? 409 : 502);
  }
  return NextResponse.json({ updatedAt: conversation.updatedAt });
}
