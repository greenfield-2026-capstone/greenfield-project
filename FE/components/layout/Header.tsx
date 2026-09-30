"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { normalizeLocale } from "@/lib/locale";
import { getAccountCopy } from "@/lib/accountTranslations";
import { getCopy } from "@/lib/translations";

export function Header() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = normalizeLocale(params.get("lang"));
  const accountCopy = getAccountCopy(currentLang);
  useEffect(() => {
    if (params.has("lang")) return;
    try {
      const saved = normalizeLocale(localStorage.getItem("histour-language"));
      const next = new URLSearchParams(params.toString()); next.set("lang", saved);
      router.replace(`${pathname}?${next.toString()}${window.location.hash}`);
    } catch { /* Keep Korean if storage is unavailable. */ }
  }, [params, pathname, router]);
  const t = getCopy(currentLang);
  useEffect(() => { document.documentElement.lang = currentLang; }, [currentLang]);
  
  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const refreshUser = () => {
      try {
        const saved = localStorage.getItem("histour-account");
        setUser(saved ? JSON.parse(saved) : null);
      } catch { setUser(null); }
    };
    refreshUser();
    window.addEventListener("histour-account-changed", refreshUser);
    return () => window.removeEventListener("histour-account-changed", refreshUser);
  }, []);
  
  const settingsHref = `/settings/locale?lang=${currentLang}`;

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8c7ad]/70 bg-[#fcfaf5]/88 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1260px,calc(100%-48px))] items-center justify-between gap-4 py-4">
        <Link
          href={`/?lang=${currentLang}`}
          className="text-3xl font-black tracking-normal text-[#111827] transition hover:text-[#9a6f2d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111827]"
        >
          Histour
        </Link>
        <nav className="flex items-center gap-2" aria-label="Primary">
          <Link
            href={settingsHref}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d8c7ad] bg-white/86 px-4 text-sm font-black text-[#111827] shadow-sm transition hover:-translate-y-0.5 hover:border-[#b89455] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111827]"
          >
            {t.language}
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
            {accountCopy.welcome}, {user.name}
          </p>
          <p className="mt-1 text-sm text-gray-500">{user.email}</p>
        </div>

        <Link href={`/profile?lang=${currentLang}`}>{accountCopy.profile}</Link>

        <button
          type="button"
          className="mt-3 w-full rounded-2xl border border-[#E6D8C5] px-4 py-3 text-sm font-bold text-[#8d3f35]"
          onClick={() => {
            localStorage.removeItem("histour-account");
            setUser(null);
            setIsProfileOpen(false);
          }}
        >
          {accountCopy.logout}
        </button>
      </div>
    )}
  </div>
) : (
  <Link
    href={`/account?lang=${currentLang}`}
    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#111827] px-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#1f2937]"
  >
    {t.login}
  </Link>
)}
        </nav>
      </div>
    </header>
  );
}
