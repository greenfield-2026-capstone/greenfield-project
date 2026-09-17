"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { airports } from "@/lib/airports";
import styles from "./FilterBar.module.css";

const filterCopy = {
  ko: {
    searchLabel: "장소 검색",
    searchPlaceholder: "장소, 인물 또는 이야기 검색",
    airportLabel: "공항 기준",
    recommendation: "장소 찾기",
    all: "전체",
    categories: ["궁궐", "성곽", "유적지", "자연/정원"],
  },
  en: {
    searchLabel: "Search places",
    searchPlaceholder: "Search palaces, fortresses, figures, themes",
    airportLabel: "Airport",
    recommendation: "Find places",
    all: "All",
    categories: ["Palace", "Fortress", "Historic Site", "Nature/Garden"],
  },
};

export function SearchFilterBar({ lang = "ko" }: { lang?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const t = lang === "en" ? filterCopy.en : filterCopy.ko;

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [isPending, startTransition] = useTransition();
  const savedQuery = params.get("q") ?? "";
  useEffect(() => setQuery(savedQuery), [savedQuery]);
  const airport = params.get("airport") ?? "all";
  const category = params.get("category") ?? "all";
  const activeCategory = ["박물관", "museum"].includes(category.toLowerCase()) ? "all" : category;

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
    startTransition(() => router.push(`/?${search.toString()}#places`, { scroll: false }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParams({ q: query.trim() || null });
  };

  return (
    <section aria-label={lang === "en" ? "Place filters" : "장소 필터"} className={styles.panel} aria-busy={isPending}>
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.searchField}>
          <span className={styles.label}>{t.searchLabel}</span>
          <span className={styles.inputWrap}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.searchPlaceholder} />
          </span>
        </label>
        <label className={styles.airportField}>
          <span className={styles.label}>{t.airportLabel}</span>
          <span className={styles.selectWrap}>
            <select value={airport} onChange={(event) => updateParams({ airport: event.target.value })}>
              {airports.map((item) => <option key={item.code} value={item.code}>{lang === "en" ? item.englishLabel : item.label}</option>)}
            </select>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </span>
        </label>
        <button type="submit" className={styles.submit} disabled={isPending}>{isPending ? (lang === "en" ? "Searching…" : "검색 중…") : t.recommendation}<span aria-hidden="true">↗</span></button>
      </form>
      <div className={styles.categories} aria-label={lang === "en" ? "Place categories" : "장소 유형"}>
        {[t.all, ...t.categories].map((category) => {
          const value = category === t.all ? "all" : category;
          return <button key={category} type="button" aria-pressed={activeCategory === value} onClick={() => updateParams({ category: value })} className={styles.category}>{category}</button>;
        })}
      </div>
      {(savedQuery || airport !== "all" || activeCategory !== "all") && <div className={styles.applied}><span>{lang === "en" ? "Filtered results" : "선택한 조건으로 찾은 여행지"}</span><button type="button" onClick={() => { setQuery(""); updateParams({q: null, airport: null, category: null}); }}>{lang === "en" ? "Reset filters" : "필터 초기화"} ↺</button></div>}
    </section>
  );
}

export const FilterBar = SearchFilterBar;
