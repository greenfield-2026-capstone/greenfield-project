"use client";
import { useEffect, useRef, useState } from "react";
import { Character, Place } from "@/types/place";
import { ChatMessage } from "@/lib/chatApi";
import styles from "./Chat.module.css";

export function ChatMessenger({ place, character, lang }: { place: Place; character: Character; lang: string }) {
  const en = lang === "en";
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: character.openingLine }]);
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
    const previous = messages;
    setMessages([...previous, { role: "user", text: message }]);
    setInput(""); setLoading(true); setError("");
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ placeId: place.id, characterId: character.id, message, history: previous, language: lang }) });
      const data = await response.json();
      if (!response.ok || !data.reply) throw new Error("Chat failed");
      setMessages(current => [...current, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages(previous); setInput(message);
      setError(en ? "Could not get a reply. Your message is saved below. Please try again." : "답변을 받지 못했어요. 입력한 메시지는 보관했으니 다시 전송해 주세요.");
    } finally { setLoading(false); busy.current = false; }
  }
  return <section className={styles.chat} aria-label={en ? "Conversation" : "인물과 대화"}>
    <header className={styles.header}><strong>{character.name}</strong><span>{place.name}</span></header>
    <div className={styles.thread} ref={thread} role="log" aria-live="polite" aria-relevant="additions text">
      <div className={styles.welcome}><span>HISTOUR</span><h2>{en ? `Talk with ${character.name}` : `${character.name}에게 물어보세요`}</h2><p>{en ? "Ask about their life, this place, or the history that interests you." : "인물의 삶부터 이 장소의 이야기까지, 궁금한 것을 자유롭게 나눠보세요."}</p></div>
      {messages.map((message, i) => <div key={i} className={message.role === "user" ? styles.user : styles.assistant}>
        <span className={styles.author}>{message.role === "user" ? (en ? "You" : "나") : character.name}</span><p>{message.text}</p>
      </div>)}
      {loading && <p className={styles.thinking} role="status">{en ? "Thinking…" : "답변을 생각하고 있어요…"}</p>}
    </div>
    <div className={styles.bottom}>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <form className={styles.composer} onSubmit={e => { e.preventDefault(); void send(); }}>
        <textarea aria-label={en ? "Message" : "메시지"} placeholder={en ? `Message ${character.name}` : `${character.name}에게 메시지 보내기`} value={input} rows={2} maxLength={4000} disabled={loading} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send(); } }} />
        <button type="submit" disabled={loading || !input.trim()} aria-label={en ? "Send message" : "메시지 전송"}>↑</button>
      </form>
      <p className={styles.note}>{en ? "AI recreates a historical persona and may make mistakes." : "역사 인물을 재현한 AI 대화이며, 실제 발언과 다를 수 있습니다."}</p>
    </div>
  </section>;
}
