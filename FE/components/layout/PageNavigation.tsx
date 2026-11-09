"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { normalizeLocale } from "@/lib/locale";

const labels = {
  ko: ["이전 화면", "메인으로 돌아가기"], en: ["Go back", "Back to home"],
  "zh-Hans": ["返回", "返回首页"], "zh-Hant": ["返回", "返回首頁"],
  ja: ["戻る", "ホームへ"], th: ["ย้อนกลับ", "กลับหน้าหลัก"],
  vi: ["Quay lại", "Về trang chủ"], ru: ["Назад", "На главную"],
  fr: ["Retour", "Accueil"], de: ["Zurück", "Zur Startseite"],
  es: ["Volver", "Ir al inicio"],
};

function NavigationLinks({ homeOnly = false }: { homeOnly?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = normalizeLocale(useSearchParams().get("lang"));
  const [back, home] = labels[locale];
  const href = `/?lang=${locale}`;
  if (pathname === "/") return null;
  return (
    <nav aria-label={home} className="flex flex-wrap items-center gap-2">
      {!homeOnly && (
        <button type="button" className="ghost-button gap-2 text-sm" onClick={() => {
          if (window.history.length > 1) router.back();
          else router.push(href);
        }}>
          <span aria-hidden="true">←</span>{back}
        </button>
      )}
      <Link href={href} className="ghost-button text-sm">{home}</Link>
    </nav>
  );
}

export function PageNavigation({ homeOnly = false }: { homeOnly?: boolean }) {
  return (
    <Suspense fallback={null}>
      <NavigationLinks homeOnly={homeOnly} />
    </Suspense>
  );
}

export function isGamePath(pathname: string) {
  return /^\/(roleplay|intro|chat|ending)(\/|$)/.test(pathname);
}

export function GameNavigation() {
  const pathname = usePathname();
  if (!isGamePath(pathname)) return null;
  return (
    <footer className="flex justify-end py-4">
      <PageNavigation homeOnly />
    </footer>
  );
}
