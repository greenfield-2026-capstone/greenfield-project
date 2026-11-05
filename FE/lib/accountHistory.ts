import type { ChatMessage } from "@/lib/chatApi";

export type Conversation = {
  placeId: string;
  characterId: string;
  characterName: string;
  placeName: string;
  lang: string;
  messages: ChatMessage[];
  updatedAt: string;
};

export type SeenEnding = {
  id: string;
  characterName: string;
  title: string;
  videoUrl?: string;
  seenAt: string;
};

export function getHistoryAccount(): string | null {
  try {
    const account = JSON.parse(localStorage.getItem("histour-account") ?? "null");
    return typeof account?.email === "string" && account.email ? account.email : null;
  } catch {
    return null;
  }
}

type History = { conversations: Conversation; endings: SeenEnding };

export function readHistory<K extends keyof History>(email: string, kind: K): History[K][] {
  try {
    const entries = JSON.parse(localStorage.getItem("histour-history:" + kind + ":" + email) ?? "[]");
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}

export function saveHistory<K extends keyof History>(
  email: string,
  kind: K,
  entry: History[K],
  matches: (item: History[K]) => boolean,
) {
  try {
    const entries = readHistory(email, kind);
    localStorage.setItem(
      "histour-history:" + kind + ":" + email,
      JSON.stringify([entry, ...entries.filter(item => !matches(item))]),
    );
    return true;
  } catch {
    return false;
  }
}
