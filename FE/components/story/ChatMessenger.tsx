"use client";
import { useEffect, useRef, useState } from "react";
import { Character, Place } from "@/types/place";
import { ChatMessage } from "@/lib/chatApi";
import { getCopy } from "@/lib/translations";
import { getHistoryAccount, readHistory, saveHistory, type Conversation } from "@/lib/accountHistory";
import styles from "./Chat.module.css";

export function ChatMessenger({ place, character, lang }: { place: Place; character: Character; lang: string }) {
  const en = lang === "en";
  const t = getCopy(lang);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: character.openingLine }]);
  useEffect(() => {
    setMessages(current => current.length === 1 && current[0].role === "assistant" ? [{ role: "assistant", text: character.openingLine }] : current);
  }, [character.openingLine]);
  const matches = (entry: Conversation) =>
    entry.placeId === place.id && entry.characterId === character.id && entry.lang === lang;
  const account = useRef<string | null>(null);
  useEffect(() => {
    const refresh = () => {
      account.current = getHistoryAccount();
      const saved = account.current && readHistory(account.current, "conversations").find(matches);
      setMessages(saved ? saved.messages : [{ role: "assistant", text: character.openingLine }]);
      setInput("");
      setError("");
    };
    refresh();
    window.addEventListener("histour-account-changed", refresh);
    window.addEventListener("storage", refreshAccount);
    function refreshAccount(event: StorageEvent) {
      if (!event.key || event.key === "histour-account") refresh();
    }
    return () => {
      window.removeEventListener("histour-account-changed", refresh);
      window.removeEventListener("storage", refreshAccount);
    };
  }, [place.id, character.id, lang, character.openingLine]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const thread = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  useEffect(() => { const el = thread.current; if (el) el.scrollTop = el.scrollHeight; }, [messages, loading]);
  async function send() {
    const message = input.trim();
    if (!message || busy.current) return;
    busy.current = true;
    const email = account.current;
    const previous = messages;
    setMessages([...previous, { role: "user", text: message }]);
    setInput(""); setLoading(true); setError("");
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ placeId: place.id, characterId: character.id, message, history: previous, language: lang }) });
      const data = await response.json();
      if (!response.ok || !data.reply) throw new Error("Chat failed");
      const completed: ChatMessage[] = [
        ...previous,
        { role: "user", text: message },
        { role: "assistant", text: data.reply },
      ];
      if (account.current !== email) return;
      setMessages(completed);
      if (email && !saveHistory(email, "conversations", {
        placeId: place.id,
        characterId: character.id,
        characterName: character.name,
        placeName: place.name,
        lang,
        messages: completed,
        updatedAt: new Date().toISOString(),
      }, matches)) {
        setError(en ? "Could not save this conversation." : "대화를 저장하지 못했습니다.");
      }
    } catch {
      if (account.current !== email) return;
      setMessages(previous); setInput(message);
      setError(t.chatError);
    } finally { setLoading(false); busy.current = false; }
  }
  return <section className={styles.chat} aria-label={en ? "Conversation" : "인물과 대화"}>
    <header className={styles.header}><strong>{character.name}</strong><span>{place.name}</span></header>
    <div className={styles.thread} ref={thread} role="log" aria-live="polite" aria-relevant="additions text">
      <div className={styles.welcome}><span>HISTOUR</span><h2>{t.ask}</h2><p>{t.chatHint}</p></div>
      {messages.map((message, i) => <div key={i} className={message.role === "user" ? styles.user : styles.assistant}>
        <span className={styles.author}>{message.role === "user" ? (en ? "You" : "나") : character.name}</span><p>{message.text}</p>
      </div>)}
      {loading && <p className={styles.thinking} role="status">{t.thinking}</p>}
    </div>
    <div className={styles.bottom}>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <form className={styles.composer} onSubmit={e => { e.preventDefault(); void send(); }}>
        <textarea aria-label={en ? "Message" : "메시지"} placeholder={t.message} value={input} rows={2} maxLength={4000} disabled={loading} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send(); } }} />
        <button type="submit" disabled={loading || !input.trim()} aria-label={t.send}>↑</button>
      </form>
      <p className={styles.note}>{t.aiNote}</p>
    </div>
  </section>;
}
