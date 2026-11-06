"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadServerConversations, mergeConversations, readHistory, restoreLocalConversations, type Conversation, type SeenEnding } from "@/lib/accountHistory";
import { ConversationSummary } from "@/components/auth/ConversationSummary";
import { ProfileAvatar } from "@/components/auth/ProfileAvatar";
import { ProfileEditor } from "@/components/auth/ProfileEditor";
import { readAccountProfile, type AccountProfile } from "@/lib/accountProfile";

export default function ProfilePage() {
  const [user, setUser] = useState<AccountProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [seenEndings, setSeenEndings] = useState<SeenEnding[]>([]);

  useEffect(() => {
    let version = 0;
    function refresh() {
      const current = ++version;
      const account = readAccountProfile();
      setUser(account);
      const local = account ? readHistory(account.email, "conversations") : [];
      setConversations(local);
      setSyncMessage(account ? "계정의 대화 기록을 확인하고 있어요…" : "");
      if (account) {
        const isCurrent = () => current === version;
        void loadServerConversations(account.email).then(async server => {
          if (!isCurrent()) return;
          setConversations(mergeConversations(local, server));
          const synced = await restoreLocalConversations(account.email, local, server, isCurrent);
          if (isCurrent()) {
            setSyncMessage(synced ? "" : "일부 대화를 계정에 저장하지 못했어요. 이 브라우저의 기록은 보관돼요.");
          }
        }).catch(error => {
          if (isCurrent()) {
            setSyncMessage(error instanceof Error && error.message === "401"
              ? "다른 기기에서도 기록을 보려면 다시 로그인해 주세요."
              : "계정 기록에 연결하지 못했어요. 잠시 뒤 새로고침해 주세요.");
          }
        });
      }
      setSeenEndings(account ? readHistory(account.email, "endings") : []);
      setIsLoading(false);
    }
    refresh();
    window.addEventListener("histour-account-changed", refresh);
    window.addEventListener("histour-profile-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      version++;
      window.removeEventListener("histour-account-changed", refresh);
      window.removeEventListener("histour-profile-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (isLoading) {
    return (
      <main className="account-page grid gap-4">
        <section className="card p-5 sm:p-6">
          <h1>불러오는 중...</h1>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="account-page grid gap-4">
        <section className="card p-5 sm:p-6">
          <p className="eyebrow">PROFILE</p>
          <h1>로그인이 필요합니다</h1>
          <p>프로필과 엔딩 기록을 보려면 먼저 로그인해주세요.</p>

          <Link href="/account" className="ghost-button mt-4">로그인하러 가기</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="account-page grid gap-4">
      <section className="card p-5 sm:p-6">
        <p className="eyebrow">PROFILE</p>
        {isEditing ? (
          <ProfileEditor key={user.email} profile={user} onClose={() => setIsEditing(false)} />
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <ProfileAvatar profile={user} size="h-[72px] w-[72px] text-2xl" />
            <div className="min-w-0 grow">
              <h1 className="text-2xl font-black">{user.name || "사용자"}</h1>
              <p className="break-all">{user.displayEmail || user.email}</p>
            </div>
            <button type="button" className="ghost-button" onClick={() => setIsEditing(true)}>프로필 수정</button>
          </div>
        )}
      </section>

      <section className="card p-5 sm:p-6">
        <h2 className="text-lg font-bold">찜한 장소</h2>
        <p>아직 찜한 장소가 없습니다.</p>
      </section>

      <section className="card p-5 sm:p-6">
        <h2 className="text-lg font-bold">자유채팅 기록</h2>
        {syncMessage && <p role="status">{syncMessage}</p>}
        {conversations.length === 0 ? !syncMessage && <p>아직 저장된 대화 기록이 없습니다.</p> : (
          <div className="mt-3 grid gap-3">
            {conversations.map(conversation => (
              <article key={JSON.stringify([user.email, conversation.placeId, conversation.characterId, conversation.lang])}
                className="rounded-2xl border border-[#e6d8c5] bg-[#fffaf4] p-4">
                <h3 className="font-bold">
                  {conversation.characterName} · {conversation.placeName}
                  <time className="ml-2 text-sm font-normal" dateTime={conversation.updatedAt}>
                    {new Date(conversation.updatedAt).toLocaleDateString("ko-KR")}
                  </time>
                </h3>
                <ConversationSummary key={conversation.updatedAt} email={user.email} conversation={conversation} />
                <details>
                  <summary className="cursor-pointer font-bold">대화 원문 보기</summary>
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
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="card p-5 sm:p-6">
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
        {seenEndings.length === 0 && (
          <p>아직 저장된 엔딩이 없습니다. 로그인한 상태로 이야기를 끝까지 진행하면 여기에 표시돼요.</p>
        )}
      </section>
    </main>
  );
}
