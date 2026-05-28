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
    <header className="site-header">
      <Link href="/" className="brand">
        Histour
      </Link>
      <div className="header-actions">
        <Link href={settingsHref} className="locale-chip">
          지역 / 언어
        </Link>
        <Link href="/account" className="account-chip">
          로그인
        </Link>
      </div>
    </header>
  );
}
