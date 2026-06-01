"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  useEffect(() => {
    const savedUser = localStorage.getItem("histour-account");

    if (!savedUser) {
      setIsLoading(false);
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    const loadEndings = async () => {
      const { data, error } = await supabase
        .from("story_endings")
        .select("*")
        .eq("user_email", parsedUser.email)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("엔딩 불러오기 실패:", error);
      } else {
        setEndings(data || []);
      }

      setIsLoading(false);
    };

    loadEndings();
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

      <section className="card">
        <h2>대화 기록</h2>
        <p>아직 저장된 대화 기록이 없습니다.</p>
      </section>

      <section className="card">
        <h2>엔딩 보관함</h2>

        {endings.length === 0 ? (
          <p>아직 저장된 엔딩이 없습니다.</p>
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