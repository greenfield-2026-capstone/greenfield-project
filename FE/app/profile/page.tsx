"use client";

export default function ProfilePage() {
  return (
    <main className="account-page">
      <section className="card">
        <p className="eyebrow">PROFILE</p>
        <h1>프로필 수정</h1>

        <label>이름</label>
        <input placeholder="이름을 입력하세요" />

        <label>이메일</label>
        <input value="ioonaej@gmail.com" disabled />

        <button>저장하기</button>
      </section>
    </main>
  );
}