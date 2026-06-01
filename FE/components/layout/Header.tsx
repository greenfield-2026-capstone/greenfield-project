"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function Header() {
  const params = useSearchParams();
  const currentLang = params.get("lang") ?? "ko";
  
  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("histour-account");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  
  const currentRegion = params.get("region") ?? "";
  const settingsHref = `/settings/locale?${new URLSearchParams({
    ...(currentLang ? { lang: currentLang } : {}),
    ...(currentRegion ? { region: currentRegion } : {}),
  }).toString()}`;

  return (
    <header className="sticky top-0 z-40 border-b border-[#E6D8C5]/80 bg-[#FAF7F2]/88 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1260px,calc(100%-48px))] items-center justify-between gap-4 py-4">
        <Link
          href={`/?lang=${currentLang}`}
          className="text-3xl font-black tracking-normal text-[#1f2a5c] transition hover:text-[#8d3f35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f2a5c]"
        >
          Histour
        </Link>
        <nav className="flex items-center gap-2" aria-label="Primary">
          <Link
            href={settingsHref}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#E6D8C5] bg-white px-4 text-sm font-black text-[#1f2a5c] shadow-sm transition hover:-translate-y-0.5 hover:border-[#1f2a5c]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2a5c]"
          >
            지역 / 언어
          </Link>
          {user ? (
  <div className="relative">
    <button
      type="button"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8d3f35] text-sm font-black text-white shadow-sm"
      onClick={() => setIsProfileOpen((prev) => !prev)}
    >
      {user.name?.charAt(0)}
    </button>

    {isProfileOpen && (
      <div className="absolute right-0 mt-3 w-72 rounded-3xl border border-[#E6D8C5] bg-white p-5 shadow-xl">
        <div className="mb-4 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#8d3f35] text-xl font-black text-white">
            {user.name?.charAt(0)}
          </div>
          <p className="font-black text-[#1f2a5c]">
            안녕하세요, {user.name}님.
          </p>
          <p className="mt-1 text-sm text-gray-500">{user.email}</p>
        </div>

        <Link
          href="/account"
          className="block rounded-2xl bg-[#FAF7F2] px-4 py-3 text-center text-sm font-bold text-[#1f2a5c]"
        >
          계정 더보기
        </Link>

        <button
          type="button"
          className="mt-3 w-full rounded-2xl border border-[#E6D8C5] px-4 py-3 text-sm font-bold text-[#8d3f35]"
          onClick={() => {
            localStorage.removeItem("histour-account");
            setUser(null);
            setIsProfileOpen(false);
          }}
        >
          로그아웃
        </button>
      </div>
    )}
  </div>
) : (
  <Link
    href="/account"
    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#8d3f35] px-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#78342c]"
  >
    로그인
  </Link>
)}
        </nav>
      </div>
    </header>
  );
}
