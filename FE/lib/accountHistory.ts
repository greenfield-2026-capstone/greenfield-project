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

export async function loadServerConversations(email: string): Promise<Conversation[]> {
  const response = await fetch("/api/account/conversations", { headers: { "x-histour-account": encodeURIComponent(email) }, signal: AbortSignal.timeout(5000) });
  if (!response.ok) return [];
  return (await response.json()).conversations;
}

export function mergeConversations(local: Conversation[], server: Conversation[]) {
  const merged = new Map<string, Conversation>();
  for (const entry of [...local, ...server]) {
    const key = JSON.stringify([entry.placeId, entry.characterId, entry.lang]);
    const previous = merged.get(key);
    if (!previous || entry.updatedAt > previous.updatedAt) merged.set(key, entry);
  }
  return [...merged.values()].sort((first, second) => second.updatedAt.localeCompare(first.updatedAt));
}

export async function syncConversation(email: string, conversation: Conversation) {
  const response = await fetch("/api/account/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-histour-account": encodeURIComponent(email) },
    body: JSON.stringify(conversation),
    signal: AbortSignal.timeout(8000),
  });
  return response.status;
}
