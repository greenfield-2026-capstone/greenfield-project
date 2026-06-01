"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { airports } from "@/lib/airports";

const filterCopy = {
  ko: {
    searchLabel: "장소 검색",
    searchPlaceholder: "궁궐, 성곽, 인물, 테마를 검색해보세요",
    airportLabel: "공항 기준",
    recommendation: "공항 기준 추천",
    all: "전체",
    categories: ["궁궐", "성곽", "유적지", "박물관", "자연/정원"],
  },
  en: {
    searchLabel: "Search places",
    searchPlaceholder: "Search palaces, fortresses, figures, themes",
    airportLabel: "Airport",
    recommendation: "Airport recommendations",
    all: "All",
    categories: ["Palace", "Fortress", "Historic Site", "Museum", "Nature/Garden"],
  },
};

export function SearchFilterBar({ lang = "ko" }: { lang?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const t = lang === "en" ? filterCopy.en : filterCopy.ko;

  const [query, setQuery] = useState(params.get("q") ?? "");
  const airport = params.get("airport") ?? "all";
  const activeCategory = params.get("category") ?? "all";

  const updateParams = (updates: Record<string, string | null>) => {
    const search = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        search.delete(key);
      } else {
        search.set(key, value);
      }
    });
    search.set("lang", lang);
    router.push(`/?${search.toString()}`);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParams({ q: query.trim() || null });
  };

  return (
    <section
      aria-label={lang === "en" ? "Place filters" : "장소 필터"}
      className="-mt-8 rounded-[28px] border border-[#E6D8C5] bg-white/88 p-4 shadow-[0_24px_70px_rgba(31,42,92,0.12)] backdrop-blur-xl md:p-5"
    >
      <form onSubmit={onSubmit} className="grid gap-3 lg:grid-cols-[1fr_220px_auto]">
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8d3f35]">
            {t.searchLabel}
          </span>
          <span className="flex min-h-14 items-center gap-3 rounded-[22px] border border-[#E6D8C5] bg-white px-4 shadow-[0_12px_26px_rgba(31,42,92,0.06)] transition focus-within:border-[#1f2a5c] focus-within:ring-4 focus-within:ring-[#1f2a5c]/10">
            <span className="text-lg text-[#1f2a5c]" aria-hidden="true">
              ⌕
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="min-h-12 flex-1 border-0 bg-transparent text-sm font-bold text-[#1d2430] outline-none placeholder:text-[#9a9186]"
            />
          </span>
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8d3f35]">
            {t.airportLabel}
          </span>
          <select
            value={airport}
            onChange={(event) => updateParams({ airport: event.target.value })}
            className="min-h-14 rounded-[22px] border border-[#E6D8C5] bg-white px-5 text-sm font-bold text-[#1d2430] shadow-[0_12px_26px_rgba(31,42,92,0.06)] outline-none transition focus-visible:border-[#1f2a5c] focus-visible:ring-4 focus-visible:ring-[#1f2a5c]/10"
          >
            {airports.map((item) => (
              <option key={item.code} value={item.code}>
                {lang === "en" ? item.englishLabel : item.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="min-h-14 self-end rounded-[22px] bg-[#1f2a5c] px-6 text-sm font-black text-white shadow-[0_18px_38px_rgba(31,42,92,0.25)] transition hover:-translate-y-0.5 hover:bg-[#172149] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2a5c]"
        >
          ✦ {t.recommendation}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {[t.all, ...t.categories].map((category) => {
          const value = category === t.all ? "all" : category;
          const isActive = activeCategory === value;

          return (
            <button
              key={category}
              type="button"
              onClick={() => updateParams({ category: value })}
              className={`rounded-full border px-4 py-2.5 text-sm font-black shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2a5c] ${
                isActive
                  ? "border-[#1f2a5c] bg-[#1f2a5c] text-white shadow-[0_12px_24px_rgba(31,42,92,0.18)]"
                  : "border-[#E6D8C5] bg-white text-[#5f4b3a] hover:-translate-y-0.5 hover:border-[#1f2a5c]/35 hover:text-[#1f2a5c]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export const FilterBar = SearchFilterBar;
