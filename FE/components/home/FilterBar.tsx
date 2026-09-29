"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { getAllRegions } from "@/lib/culture-data";
import styles from "./FilterBar.module.css";

import { useTranslatedContent } from "@/lib/useTranslatedContent";
import { getCopy } from "@/lib/translations";

export function SearchFilterBar({ lang = "ko" }: { lang?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const t = getCopy(lang);

  const [query, setQuery] = useState(params.get("q") ?? "");
  const region = params.get("region") ?? "all";
  const regions = getAllRegions();
  const {content:regionCopy} = useTranslatedContent("ui", "regions", {text:["지역 기준", ...regions]}, lang);
  const category = params.get("category") ?? "all";
  const categoryAliases: Record<string, string> = { Palace: "궁궐", Fortress: "성곽", "Historic Site": "유적지", Museum: "박물관", "Nature/Garden": "자연/정원" };
  const activeCategory = categoryAliases[category] ?? category;

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
      className={styles.panel}
    >
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.searchField}>
          <span className={styles.label}>{t.search}</span>
          <span className={styles.inputWrap}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
            />
          </span>
        </label>
        <label className={styles.regionField}>
          <span className={styles.label}>{regionCopy.text[0]}</span>
          <span className={styles.selectWrap}>
            <select value={region} onChange={(event) => updateParams({ region: event.target.value, airport: null })}>
              <option value="all">{t.all}</option>
              {regions.map((value, index) => <option key={value} value={value}>{regionCopy.text[index + 1]}</option>)}
            </select>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </label>
        <button type="submit" className={styles.submit}>{t.find}<span aria-hidden="true">↗</span></button>
      </form>
      <div className={styles.categories} aria-label={lang === "en" ? "Place categories" : "장소 유형"}>
        {[['all',t.all], ['궁궐',t.palace], ['성곽',t.fortress], ['유적지',t.historic], ['박물관',t.museum], ['자연/정원',t.nature]].map(([value, label]) => (
          <button key={value} type="button" aria-pressed={activeCategory === value} onClick={() => updateParams({ category: value })} className={styles.category}>{label}</button>
        ))}
      </div>
    </section>
  );
}

export const FilterBar = SearchFilterBar;
