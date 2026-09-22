import Link from "next/link";
import styles from "./HeroSection.module.css";

const heroCopy = {
  ko: {
    eyebrow: "HISTOUR",
    title: "이야기 속으로 떠나는 역사 여행",
    description:
      "AI 역사 인물과 대화하고, 선택에 따라 달라지는 스토리를 따라 한국의 장소를 여행처럼 경험하세요.",
    browse: "장소 둘러보기",
    chat: "AI 인물과 대화 시작",
    statPlaces: "역사 여행지",
    statStories: "인물 대화",
    statRoutes: "공항 추천 기준",
  },
  en: {
    eyebrow: "HISTOUR",
    title: "Start a Story-Led History Trip",
    description:
      "Talk with historical figures and explore Korean places through interactive story choices.",
    browse: "Browse Places",
    chat: "Start an AI Story",
    statPlaces: "Historic places",
    statStories: "Figure chats",
    statRoutes: "Airport filters",
  },
};

export function HeroSection({ lang = "ko" }: { lang?: string }) {
  const t = lang === "en" ? heroCopy.en : heroCopy.ko;

  return (
    <section className={styles.hero}>
      <div className={styles.photo} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.eyebrow}>{t.eyebrow}<span />{lang === "en" ? "KOREA, THROUGH STORIES" : "장소에 깃든 이야기를 만나다"}</p>
        <h1 className={styles.title}>
          {lang === "en" ? <>A journey through places,<br />and their stories.</> : <>이야기 속으로 떠나는<br />역사 여행</>}
        </h1>
        <p className={styles.description}>{t.description}</p>
        <div className={styles.actions}>
          <Link href="#places" className={styles.primary}>{t.browse}<span aria-hidden="true">↗</span></Link>
          <Link href={`/story/gyeongbokgung/taejo?lang=${lang}`} className={styles.secondary}>{t.chat}<span aria-hidden="true">→</span></Link>
        </div>
        <dl className={styles.stats}>
          {[t.statPlaces, t.statStories, t.statRoutes].map((label, index) => (
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
