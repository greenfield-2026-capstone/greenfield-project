"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function Header() {
  const params = useSearchParams();
  const currentLang = params.get("lang") ?? "ko";
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
          <Link
            href="/account"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#8d3f35] px-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#78342c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d3f35]"
          >
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
}
