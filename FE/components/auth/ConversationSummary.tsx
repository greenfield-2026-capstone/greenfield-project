"use client";

import { useEffect, useRef, useState } from "react";
import { getHistoryAccount, type Conversation } from "@/lib/accountHistory";

export function ConversationSummary({ email, conversation }: { email: string; conversation: Conversation }) {
  const key = "histour-summary:" + JSON.stringify([email, conversation.placeId, conversation.characterId, conversation.lang]);
  const [summary, setSummary] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? "null");
      if (saved?.updatedAt === conversation.updatedAt && typeof saved.summary === "string") {
        setSummary(saved.summary);
      }
    } catch {
      // The conversation can still be summarized again.
    }
    return () => activeRequest.current?.abort();
  }, [key, conversation.updatedAt]);

  const transcript = conversation.messages.filter(message =>
    (message.role === "user" || message.role === "assistant") && message.text.trim());
  const limited = transcript.length > 24 || transcript.some(message => message.text.length > 2000);

  async function summarize() {
    if (activeRequest.current || getHistoryAccount() !== email) return;
    const controller = new AbortController();
    activeRequest.current = controller;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/chat/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          language: conversation.lang,
          messages: transcript.slice(-24).map(({ role, text }) => ({ role, text: text.slice(0, 2000) })),
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      const data = await response.json();
      if (typeof data.summary !== "string" || !data.summary.trim()) throw new Error("Empty summary");
      if (controller.signal.aborted || getHistoryAccount() !== email) return;
      setSummary(data.summary);
      try {
        localStorage.setItem(key, JSON.stringify({ updatedAt: conversation.updatedAt, summary: data.summary }));
      } catch {
        // Keep the generated recap visible even when storage is full.
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setError(error instanceof Error && error.message === "503"
          ? "Claude 요약이 아직 연결되지 않았어요."
          : "요약을 만들지 못했어요. 다시 시도해 주세요.");
      }
    } finally {
      activeRequest.current = null;
      if (!controller.signal.aborted) setPending(false);
    }
  }

  return (
    <div className="my-3 border-t border-[#e6d8c5] pt-3">
      {summary ? (
        <>
          <p className="eyebrow">{limited ? "CLAUDE · 최근 대화 요약" : "CLAUDE · 대화 요약"}</p>
          <p className="mt-1 whitespace-pre-line break-words">{summary}</p>
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="ghost-button disabled:opacity-60" disabled={pending} onClick={() => void summarize()}>
            {pending ? "요약 만드는 중…" : "Claude로 요약"}
          </button>
          <p className="text-sm">누르면 {limited ? "최근 대화 일부가" : "대화 내용이"} Claude에 전송돼요.</p>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-[#8d3f35]" role="alert">{error}</p>}
    </div>
  );
}
