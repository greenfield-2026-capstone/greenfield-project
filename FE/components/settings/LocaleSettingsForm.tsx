"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { languageOptions, regionOptions } from "@/lib/locale";

export function LocaleSettingsForm() {
  const router = useRouter();
  const params = useSearchParams();
  const initialRegion = params.get("region") ?? "";
  const initialLanguage = params.get("lang") ?? "";
  const [region, setRegion] = useState(initialRegion);
  const [language, setLanguage] = useState(initialLanguage);
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const canApply = Boolean(region && language);

  const selectedLanguageLabel = useMemo(
    () => languageOptions.find((option) => option.code === language)?.label ?? "언어를 선택해 주세요",
    [language]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedRegion = window.localStorage.getItem("histour-region");
    const savedLanguage = window.localStorage.getItem("histour-language");

    if (!region && savedRegion) {
      setRegion(savedRegion);
    }

    if (!language && savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [language, region]);

  return (
    <>
      <section className="locale-page">
        <div className="locale-page-top">
          <button type="button" className="back-button" onClick={() => router.back()} aria-label="Go back">
            ←
          </button>
          <div>
            <p className="eyebrow">Settings</p>
            <h1>지역 / 언어 설정</h1>
          </div>
        </div>

        <div className="locale-form">
          <label className="locale-field">
            <span>국가 / 지역 선택</span>
            <select value={region} onChange={(event) => setRegion(event.target.value)}>
              <option value="" disabled>
                국가 / 지역을 선택해 주세요
              </option>
              {regionOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button type="button" className="locale-field locale-trigger" onClick={() => setIsLanguageSheetOpen(true)}>
            <span>언어 선택</span>
            <strong>{selectedLanguageLabel}</strong>
          </button>

          <button
            type="button"
            className={`locale-apply ${canApply ? "is-ready" : ""}`}
            disabled={!canApply}
            onClick={() => {
              if (!canApply) return;
              const next = new URLSearchParams();
              next.set("region", region);
              next.set("lang", language);
              if (typeof window !== "undefined") {
                window.localStorage.setItem("histour-language", language);
                window.localStorage.setItem("histour-region", region);
              }
              router.push(`/?${next.toString()}`);
            }}
          >
            적용
          </button>
        </div>
      </section>

      {isLanguageSheetOpen ? (
        <div className="sheet-overlay" onClick={() => setIsLanguageSheetOpen(false)}>
          <div className="language-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="language-sheet-head">
              <h2>언어 선택</h2>
            </div>
            <div className="language-list">
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  className={`language-option ${language === option.code ? "is-active" : ""}`}
                  onClick={() => {
                    setLanguage(option.code);
                    setIsLanguageSheetOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  {language === option.code ? <span>✓</span> : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
