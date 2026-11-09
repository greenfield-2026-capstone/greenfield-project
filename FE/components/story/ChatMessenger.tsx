"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Character, Place } from "@/types/place";
import { ChatMessage } from "@/lib/chatApi";
import { getCopy } from "@/lib/translations";
import { getHistoryAccount, loadServerConversations, mergeConversations, readHistory, saveHistory, syncConversation, type Conversation } from "@/lib/accountHistory";
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
    let version = 0;
    const refresh = () => {
      const current = ++version;
      account.current = getHistoryAccount();
      const saved = account.current && readHistory(account.current, "conversations").find(matches);
      setMessages(saved ? saved.messages : [{ role: "assistant", text: character.openingLine }]);
      const startedAt = sendVersion.current;
      const email = account.current;
      if (email) {
        void loadServerConversations(email).then(server => {
          const latest = mergeConversations(saved ? [saved] : [], server.filter(matches))[0];
          if (current === version && latest && !busy.current && sendVersion.current === startedAt) setMessages(latest.messages);
        }).catch(() => {});
      }
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
      version++;
      window.removeEventListener("histour-account-changed", refresh);
      window.removeEventListener("storage", refreshAccount);
    };
  }, [place.id, character.id, lang, character.openingLine]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const thread = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const sendVersion = useRef(0);
  useEffect(() => { const el = thread.current; if (el) el.scrollTop = el.scrollHeight; }, [messages, loading]);
  async function send() {
    const message = input.trim();
    if (!message || busy.current) return;
    busy.current = true;
    sendVersion.current++;
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
      if (!email) return;
      const conversation = {
        placeId: place.id,
        characterId: character.id,
        characterName: character.name,
        placeName: place.name,
        lang,
        messages: completed,
        updatedAt: new Date().toISOString(),
      };
      const localSaved = saveHistory(email, "conversations", conversation, matches);
      const status = await syncConversation(email, conversation).catch(() => 0);
      if (account.current === email && status !== 200) {
        if (!localSaved) setError(en ? "Could not save this conversation." : "대화를 저장하지 못했습니다.");
        else if (status === 409) setError(en ? "Saved here. A different version is on the server." : "이 브라우저에 저장했어요. 서버에 다른 대화 버전이 남아 있어 덮어쓰지 않았어요.");
        else if (status === 401) setError(en ? "Saved here. Sign in again to sync." : "이 브라우저에 저장했어요. DB에 저장하려면 다시 로그인해 주세요.");
        else setError(en ? "Saved here. Server sync is unavailable." : "이 브라우저에 저장했어요. 서버에 동기화하지 못했습니다.");
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
      {messages.map((message, i) => (
        <div key={i} className={message.role === "user" ? styles.user : styles.assistant}>
          {message.role !== "user" && (
            <Image src={character.imageUrl} alt="" width={40} height={40}
              className={styles.avatar} style={{ objectPosition: character.imagePosition }} />
          )}
          <div className={styles.messageBody}>
            <span className={styles.author}>
              {message.role === "user" ? (en ? "You" : "나") : character.name}
            </span>
            <p className={styles.bubble}>{message.text}</p>
          </div>
        </div>
      ))}
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
