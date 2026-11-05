"use client";

import { useState } from "react";
import { saveAccountProfile, type AccountProfile } from "@/lib/accountProfile";
import { ProfileAvatar } from "./ProfileAvatar";

const fieldClass = "w-full rounded-xl border border-[#d8c7ad] bg-white px-4 py-3";

export function ProfileEditor({ profile, onClose }: { profile: AccountProfile; onClose: () => void }) {
  const [name, setName] = useState(profile.name);
  const [displayEmail, setDisplayEmail] = useState(profile.displayEmail ?? profile.email);
  const [photo, setPhoto] = useState(profile.photo);
  const [readingPhoto, setReadingPhoto] = useState(false);
  const [error, setError] = useState("");

  function loadPhoto(file?: File) {
    if (!file) return;
    setError("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 2 * 1024 * 1024) {
      setError("2MB 이하의 JPG, PNG, WebP 사진을 골라주세요.");
      return;
    }
    const reader = new FileReader();
    setReadingPhoto(true);
    reader.onload = () => setPhoto(String(reader.result));
    reader.onerror = () => setError("사진을 불러오지 못했습니다.");
    reader.onloadend = () => setReadingPhoto(false);
    reader.readAsDataURL(file);
  }

  return (
    <form className="mt-3 grid max-w-xl gap-4" onSubmit={event => {
      event.preventDefault();
      if (readingPhoto) return;
      if (!name.trim()) {
        setError("이름을 입력해 주세요.");
        return;
      }
      if (saveAccountProfile({ ...profile, name: name.trim(), displayEmail: displayEmail.trim(), photo })) {
        onClose();
      } else {
        setError("프로필을 저장하지 못했습니다. 로그인 상태와 브라우저 저장 공간을 확인해 주세요.");
      }
    }}>
      <h1 className="text-2xl font-black">프로필 수정</h1>
      <div className="flex flex-wrap items-center gap-4">
        <ProfileAvatar profile={{ ...profile, name, photo }} size="h-[72px] w-[72px] text-2xl" />
        <div className="flex flex-wrap gap-2">
          <label className="ghost-button cursor-pointer focus-within:outline focus-within:outline-2">
            사진 선택
            <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" disabled={readingPhoto}
              onChange={event => {
                loadPhoto(event.currentTarget.files?.[0]);
                event.currentTarget.value = "";
              }} />
          </label>
          {photo && <button type="button" className="ghost-button" disabled={readingPhoto} onClick={() => setPhoto(undefined)}>사진 삭제</button>}
        </div>
      </div>
      <label className="grid gap-1 font-bold">
        이름
        <input className={fieldClass} value={name} onChange={event => setName(event.target.value)} required maxLength={80} />
      </label>
      <label className="grid gap-1 font-bold">
        표시 이메일
        <input className={fieldClass} type="email" value={displayEmail} onChange={event => setDisplayEmail(event.target.value)}
          required maxLength={254} aria-describedby="profile-email-hint" />
      </label>
      <p id="profile-email-hint" className="text-sm">계정 화면에 표시되는 이메일이에요. 로그인에는 기존 이메일을 사용해 주세요.</p>
      {error && <p role="alert" className="text-sm text-[#8d3f35]">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <button type="submit" className="rounded-full bg-[#8d3f35] px-5 py-2 font-bold text-white disabled:opacity-60" disabled={readingPhoto}>저장</button>
        <button type="button" className="ghost-button" onClick={onClose}>취소</button>
      </div>
    </form>
  );
}
