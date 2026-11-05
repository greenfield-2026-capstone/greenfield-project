"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { normalizeLocale } from "@/lib/locale";
import { getAccountCopy } from "@/lib/accountTranslations";
import { ProfileAvatar } from "@/components/auth/ProfileAvatar";
import { readAccountProfile, type AccountProfile } from "@/lib/accountProfile";
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
  
  const [user, setUser] = useState<AccountProfile | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const refreshUser = () => setUser(readAccountProfile());
    refreshUser();
    window.addEventListener("histour-account-changed", refreshUser);
    window.addEventListener("histour-profile-changed", refreshUser);
    window.addEventListener("storage", refreshUser);
    return () => {
      window.removeEventListener("histour-account-changed", refreshUser);
      window.removeEventListener("histour-profile-changed", refreshUser);
      window.removeEventListener("storage", refreshUser);
    };
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
      className="inline-flex rounded-full shadow-sm"
      aria-label={accountCopy.profile}
      aria-expanded={isProfileOpen}
      onClick={() => setIsProfileOpen((prev) => !prev)}
    >
      <ProfileAvatar profile={user} size="h-12 w-12 text-sm" />
    </button>

    {isProfileOpen && (
      <div className="absolute right-0 mt-3 w-72 rounded-3xl border border-[#E6D8C5] bg-white p-5 shadow-xl">
        <div className="mb-4 text-center">
          <ProfileAvatar profile={user} size="mb-3 h-16 w-16 text-xl" />
          <p className="font-black text-[#1f2a5c]">
            {accountCopy.welcome}, {user.name}
          </p>
          <p className="mt-1 break-all text-sm text-gray-500">{user.displayEmail || user.email}</p>
        </div>

        <Link
          href={`/profile?lang=${currentLang}`}
          className="block w-full rounded-2xl border border-[#E6D8C5] px-4 py-3 text-center text-sm font-bold text-[#1f2a5c] hover:bg-[#fcfaf5]"
          onClick={() => setIsProfileOpen(false)}
        >
          {accountCopy.profile}
        </Link>

        <button
          type="button"
          className="mt-3 w-full rounded-2xl border border-[#E6D8C5] px-4 py-3 text-sm font-bold text-[#8d3f35]"
          onClick={() => {
            localStorage.removeItem("histour-account");
            window.dispatchEvent(new Event("histour-account-changed"));
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
