"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { languageOptions, regionOptions } from "@/lib/locale";

type TabMode = "login" | "signup";

export function AccountAccessForm() {
  const router = useRouter();
  const [mode, setMode] = useState<TabMode>("signup");
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");

  const canLogin = Boolean(loginId.trim() && loginPassword.trim());
  const canSignup = useMemo(() => {
    return Boolean(
      nickname.trim() &&
        username.trim() &&
        email.trim() &&
        password.trim() &&
        confirmPassword.trim() &&
        password === confirmPassword &&
        region &&
        language
    );
  }, [confirmPassword, email, language, nickname, password, region, username]);

  function moveToHome(nextRegion: string, nextLanguage: string) {
    const params = new URLSearchParams();
    if (nextRegion) params.set("region", nextRegion);
    if (nextLanguage) params.set("lang", nextLanguage);
    router.push(`/?${params.toString()}`);
  }

  return (
    <section className="account-page">
      <div className="account-page-top">
        <div>
          <p className="eyebrow">Account</p>
          <h1>회원 설정</h1>
        </div>
      </div>

      <div className="account-layout">
        <div className="card account-form-card">
          <div className="account-tabs">
            <button
              type="button"
              className={`account-tab ${mode === "signup" ? "is-active" : ""}`}
              onClick={() => setMode("signup")}
            >
              회원가입
            </button>
            <button
              type="button"
              className={`account-tab ${mode === "login" ? "is-active" : ""}`}
              onClick={() => setMode("login")}
            >
              로그인
            </button>
          </div>

          {mode === "signup" ? (
            <div className="account-form">
              <label className="locale-field">
                <span>닉네임</span>
                <input value={nickname} onChange={(event) => setNickname(event.target.value)} placeholder="닉네임을 입력해 주세요" />
              </label>
              <label className="locale-field">
                <span>아이디</span>
                <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="영문/숫자 아이디" />
              </label>
              <label className="locale-field">
                <span>이메일</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="example@email.com" />
              </label>
              <label className="locale-field">
                <span>비밀번호</span>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="비밀번호를 입력해 주세요" />
              </label>
              <label className="locale-field">
                <span>비밀번호 확인</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="한 번 더 입력해 주세요"
                />
              </label>
              <label className="locale-field">
                <span>국가 / 지역</span>
                <select value={region} onChange={(event) => setRegion(event.target.value)}>
                  <option value="" disabled>
                    국가 / 지역을 선택해 주세요
                  </option>
                  {regionOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="locale-field">
                <span>선호 언어</span>
                <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                  <option value="" disabled>
                    선호 언어를 선택해 주세요
                  </option>
                  {languageOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className={`locale-apply ${canSignup ? "is-ready" : ""}`}
                disabled={!canSignup}
                onClick={() => {
                  if (!canSignup || typeof window === "undefined") return;

                  const account = { nickname, username, email, region, language };
                  window.localStorage.setItem("histour-account", JSON.stringify(account));
                  window.localStorage.setItem("histour-region", region);
                  window.localStorage.setItem("histour-language", language);
                  moveToHome(region, language);
                }}
              >
                가입하고 시작하기
              </button>
            </div>
          ) : (
            <div className="account-form">
              <label className="locale-field">
                <span>아이디 또는 이메일</span>
                <input value={loginId} onChange={(event) => setLoginId(event.target.value)} placeholder="아이디 또는 이메일" />
              </label>
              <label className="locale-field">
                <span>비밀번호</span>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  placeholder="비밀번호를 입력해 주세요"
                />
              </label>
              <button
                type="button"
                className={`locale-apply ${canLogin ? "is-ready" : ""}`}
                disabled={!canLogin}
                onClick={() => {
                  if (!canLogin || typeof window === "undefined") return;
                  moveToHome(window.localStorage.getItem("histour-region") ?? "", window.localStorage.getItem("histour-language") ?? "");
                }}
              >
                로그인
              </button>
            </div>
          )}
        </div>

        <aside className="card account-benefits">
          <div className="account-benefits-head">
            <p className="eyebrow">My Histour</p>
            <h2>내 공간 미리보기</h2>
          </div>

          <div className="account-preview-list">
            <section className="account-preview-card">
              <span className="account-preview-label">Saved Places</span>
              <strong>찜한 장소</strong>
              <p>회원가입 후 마음에 드는 장소를 저장하고 다시 둘러볼 수 있습니다.</p>
            </section>

            <section className="account-preview-card">
              <span className="account-preview-label">Recent Chats</span>
              <strong>대화 기록</strong>
              <p>인물과 나눈 대화를 저장해 이어서 보거나 다시 시작할 수 있습니다.</p>
            </section>

            <section className="account-preview-card">
              <span className="account-preview-label">Story Archive</span>
              <strong>엔딩 보관함</strong>
              <p>내가 본 스토리와 분기 결과를 한곳에 모아 다시 확인할 수 있습니다.</p>
            </section>
          </div>
        </aside>
      </div>
    </section>
  );
}
