import Link from "next/link";
import styles from "./HeroSection.module.css";

import { getCopy } from "@/lib/translations";

export function HeroSection({ lang = "ko" }: { lang?: string }) {
  const t = getCopy(lang);

  return (
    <section className={styles.hero}>
      <div className={styles.photo} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.eyebrow}>HISTOUR<span />{t.places}</p>
        <h1 className={styles.title}>
          {t.heroTitle}
        </h1>
        <p className={styles.description}>{t.heroDescription}</p>
        <div className={styles.actions}>
          <Link href="#places" className={styles.primary}>{t.browse}<span aria-hidden="true">↗</span></Link>
          <Link href={`/story/gyeongbokgung/taejo?lang=${lang}`} className={styles.secondary}>{t.chat}<span aria-hidden="true">→</span></Link>
        </div>
        <dl className={styles.stats}>
          {[t.places, t.people, t.airports].map((label, index) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{index === 0 ? "12" : index === 1 ? "15" : "4"}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className={styles.caption}>{lang === "en" ? "SEOUL · GYEONGBOKGUNG" : "서울 · 경복궁"}</p>
    </section>
  );
}
