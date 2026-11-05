"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readHistory, type Conversation, type SeenEnding } from "@/lib/accountHistory";
import { supabase } from "@/lib/supabase";

type User = {
  name?: string;
  email?: string;
  image?: string;
  profileImage?: string;
  avatar_url?: string;
};

type Ending = {
  id: string;
  user_email: string;
  story_id: string;
  character_name: string;
  ending_type: string;
  ending_title: string;
  ending_content: string;
  video_url?: string | null;
  language?: string;
  created_at: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [endings, setEndings] = useState<Ending[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [seenEndings, setSeenEndings] = useState<SeenEnding[]>([]);
  const [endingError, setEndingError] = useState(false);

  useEffect(() => {
    let request = 0;
    async function refresh() {
      const currentRequest = ++request;
      let account: User | null = null;
      try {
        account = JSON.parse(localStorage.getItem("histour-account") ?? "null");
      } catch {
        // A broken account record is treated as signed out.
      }
      const email = account?.email;
      setUser(email ? account : null);
      setEndings([]);
      setEndingError(false);
      setConversations(email ? readHistory(email, "conversations") : []);
      setSeenEndings(email ? readHistory(email, "endings") : []);
      setIsLoading(false);
      if (!email) return;

      const { data, error } = await supabase
        .from("story_endings")
        .select("*")
        .eq("user_email", email)
        .order("created_at", { ascending: false });

      if (request !== currentRequest) return;
      setEndingError(Boolean(error));
      if (!error) setEndings(data ?? []);
    }
    function refreshFromStorage(event: StorageEvent) {
      if (!event.key || event.key === "histour-account" || event.key.startsWith("histour-history:")) {
        void refresh();
      }
    }
    void refresh();
    window.addEventListener("histour-account-changed", refresh);
    window.addEventListener("storage", refreshFromStorage);
    return () => {
      request++;
      window.removeEventListener("histour-account-changed", refresh);
      window.removeEventListener("storage", refreshFromStorage);
    };
  }, []);

  if (isLoading) {
    return (
      <main className="account-page">
        <section className="card">
          <h1>불러오는 중...</h1>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="account-page">
        <section className="card">
          <p className="eyebrow">PROFILE</p>
          <h1>로그인이 필요합니다</h1>
          <p>프로필과 엔딩 기록을 보려면 먼저 로그인해주세요.</p>

          <Link href="/account">
            <button type="button">로그인하러 가기</button>
          </Link>
        </section>
      </main>
    );
  }

  const profileImage =
    user.avatar_url || user.profileImage || user.image || "";

  return (
    <main className="account-page">
      <section className="card">
        <p className="eyebrow">PROFILE</p>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="프로필 이미지"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "#e7d8c9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              👤
            </div>
          )}

          <div>
            <h1>{user.name || "사용자"}님</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Link href="/profile/edit">
            <button type="button">프로필 수정</button>
          </Link>
        </div>
      </section>

      <section className="card">
        <h2>찜한 장소</h2>
        <p>아직 찜한 장소가 없습니다.</p>
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-bold">자유채팅 기록</h2>
        {conversations.length === 0 ? <p>아직 저장된 대화 기록이 없습니다.</p> : (
          <div className="mt-3 grid gap-3">
            {conversations.map(conversation => (
              <details key={JSON.stringify([conversation.placeId, conversation.characterId, conversation.lang])}
                className="rounded-2xl border border-[#e6d8c5] bg-[#fffaf4] p-4">
                <summary className="cursor-pointer font-bold">
                  {conversation.characterName} · {conversation.placeName}
                  <time className="ml-2 text-sm font-normal" dateTime={conversation.updatedAt}>
                    {new Date(conversation.updatedAt).toLocaleDateString("ko-KR")}
                  </time>
                </summary>
                <ul className="my-3 grid gap-2">
                  {conversation.messages.map((message, index) => (
                    <li key={index} className="whitespace-pre-wrap break-words">
                      <strong>{message.role === "user" ? "나" : conversation.characterName}</strong> {message.text}
                    </li>
                  ))}
                </ul>
                <Link className="underline" href={`/story/${conversation.placeId}/${conversation.characterId}?lang=${conversation.lang}`}>
                  대화 이어가기
                </Link>
              </details>
            ))}
          </div>
        )}
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-bold">엔딩 보관함</h2>
        {seenEndings.length > 0 && (
          <div className="mt-3 grid gap-3">
            {seenEndings.map(ending => (
              <article key={ending.id} className="rounded-2xl border border-[#e6d8c5] bg-[#fffaf4] p-4">
                <h3 className="font-bold">{ending.characterName} · {ending.title}</h3>
                <time dateTime={ending.seenAt}>{new Date(ending.seenAt).toLocaleDateString("ko-KR")}</time>
                {ending.videoUrl && <video className="mt-3 w-full max-w-xl rounded-xl" controls preload="none" src={ending.videoUrl} />}
              </article>
            ))}
          </div>
        )}
        {endingError && <p>기존 서버 엔딩 기록을 불러오지 못했습니다.</p>}

        {endings.length === 0 ? (
          !seenEndings.length && !endingError && <p>아직 저장된 엔딩이 없습니다.</p>
        ) : (
          <div style={{ display: "grid", gap: "20px", marginTop: "16px" }}>
            {endings.map((ending) => (
              <article
                key={ending.id}
                style={{
                  padding: "18px",
                  borderRadius: "18px",
                  border: "1px solid #e6d8c5",
                  background: "#fffaf4",
                }}
              >
                <p className="eyebrow">
                  {ending.language === "en" ? "ENDING" : "엔딩"}
                </p>

                <h3>{ending.ending_title}</h3>
                <p>{ending.character_name}</p>

                <p style={{ whiteSpace: "pre-line", marginTop: "12px" }}>
                  {ending.ending_content}
                </p>

                {ending.video_url && (
                  <video
                    controls
                    src={ending.video_url}
                    style={{
                      width: "100%",
                      marginTop: "16px",
                      borderRadius: "14px",
                    }}
                  />
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}