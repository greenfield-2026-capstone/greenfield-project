"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { languageOptions, normalizeLocale, LocaleCode } from "@/lib/locale";
import { getCopy, languageNames } from "@/lib/translations";
import styles from "./LocaleSettingsForm.module.css";

export function LocaleSettingsForm() {
  const router = useRouter();
  const params = useSearchParams();
  const requested = params.get("lang");
  const [language, setLanguage] = useState<LocaleCode>(normalizeLocale(requested));
  const [saving, setSaving] = useState(false);
  const t = getCopy(language);
  useEffect(() => {
    if (requested) {
      setLanguage(normalizeLocale(requested));
    } else {
      try { setLanguage(normalizeLocale(localStorage.getItem("histour-language"))); } catch { /* URL selection still works when storage is unavailable. */ }
    }
  }, [requested]);

  return <section className={styles.page}>
    <Link href={`/?lang=${normalizeLocale(requested)}`} className={styles.back}>← {t.back}</Link>
    <div className={styles.card}>
      <div className={styles.icon} aria-hidden="true">文 <span>A</span></div>
      <p className={styles.eyebrow}>MAKE YOURSELF AT HOME</p>
      <h1>{t.settingsTitle}</h1>
      <p className={styles.description}>{t.settingsDescription}</p>
      <form onSubmit={event => {
        event.preventDefault(); setSaving(true);
        try { localStorage.setItem("histour-language", language); localStorage.removeItem("histour-region"); } catch { /* Continue using the language in the URL. */ }
        router.push(`/?lang=${language}`);
      }}>
        <fieldset className={styles.options}>
          <legend>{t.language}</legend>
          {languageOptions.map(option => <label className={styles.option} key={option.code}>
            <input type="radio" name="language" value={option.code} checked={language === option.code} onChange={() => setLanguage(option.code)} />
            <span className={styles.symbol} aria-hidden="true">{option.code === "ko" ? "가" : "Aa"}</span>
            <span className={styles.label}><strong lang={option.code}>{option.label}</strong><small>{languageNames[option.code]}</small></span>
            <span className={styles.check} aria-hidden="true">{language === option.code ? "✓" : ""}</span>
          </label>)}
        </fieldset>
        <p className={styles.note}>{t.contentNote}</p>
        <button className={styles.apply} type="submit" disabled={saving}>{saving ? t.applying : t.apply}<span aria-hidden="true">→</span></button>
      </form>

    </div>
    <p className={styles.footer}>HISTOUR · PLACES WITH STORIES</p>
  </section>;
}
