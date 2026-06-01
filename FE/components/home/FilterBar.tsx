"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { airports } from "@/lib/airports";

const filterCopy = {
  ko: {
    searchLabel: "장소 검색",
    searchPlaceholder: "궁궐, 성곽, 역사 인물 검색",
    airportLabel: "공항 기준",
    recommendation: "공항 기준 추천",
    all: "전체",
    categories: ["궁궐", "성곽", "유적지", "박물관", "자연/정원"],
  },
  en: {
    searchLabel: "Search places",
    searchPlaceholder: "Search palaces, fortresses, figures",
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
      className="-mt-10 rounded-3xl border border-[#E6D8C5] bg-white/85 p-4 shadow-[0_22px_60px_rgba(31,42,92,0.10)] backdrop-blur-xl md:p-5"
    >
      <form onSubmit={onSubmit} className="grid gap-3 lg:grid-cols-[1fr_240px_auto]">
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8d3f35]">
            {t.searchLabel}
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.searchPlaceholder}
            className="min-h-14 rounded-[20px] border border-[#E6D8C5] bg-white px-5 text-sm font-bold text-[#1d2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] outline-none transition placeholder:text-[#9a9186] focus-visible:border-[#1f2a5c] focus-visible:ring-4 focus-visible:ring-[#1f2a5c]/10"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8d3f35]">
            {t.airportLabel}
          </span>
          <select
            value={airport}
            onChange={(event) => updateParams({ airport: event.target.value })}
            className="min-h-14 rounded-[20px] border border-[#E6D8C5] bg-white px-5 text-sm font-bold text-[#1d2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] outline-none transition focus-visible:border-[#1f2a5c] focus-visible:ring-4 focus-visible:ring-[#1f2a5c]/10"
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
          className="min-h-14 self-end rounded-[20px] bg-[#1f2a5c] px-6 text-sm font-black text-white shadow-[0_14px_28px_rgba(31,42,92,0.22)] transition hover:-translate-y-0.5 hover:bg-[#172149] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2a5c]"
        >
          {t.recommendation}
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
              className={`rounded-full border px-4 py-2.5 text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2a5c] ${
                isActive
                  ? "border-[#1f2a5c] bg-[#1f2a5c] text-white"
                  : "border-[#E6D8C5] bg-white text-[#5f4b3a] hover:border-[#1f2a5c]/35 hover:text-[#1f2a5c]"
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
