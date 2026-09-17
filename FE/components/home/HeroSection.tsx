import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.css";

export function HeroSection({ lang = "ko" }: { lang?: string }) {
  const en = lang === "en";
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}><span className={styles.seal} aria-hidden="true">史</span>{en ? "A JOURNEY THROUGH KOREA" : "한국의 장소를 걷고, 시간을 만나다"}</p>
        <h1>{en ? <>Walk into places.<br />Meet their stories.</> : <>오래된 풍경,<br />새로운 이야기.</>}</h1>
        <p className={styles.description}>{en ? "Beyond the palace gates, discover the lives that shaped Korea. Explore historic places and talk with AI historical figures." : <>궁궐의 문 너머, 골목의 모퉁이에 남은 시간.<br />한국의 역사 공간을 둘러보고<br />그곳의 인물과 AI 대화로 이야기를 나눠보세요.</>}</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="#places">{en ? "Explore places" : "여행지 둘러보기"}<span aria-hidden="true">↗</span></Link>
          <Link className={styles.secondary} href={`/story/gyeongbokgung/taejo?lang=${lang}`}>{en ? "Meet a historical figure" : "역사 인물 만나기"}<span aria-hidden="true">→</span></Link>
        </div>
        <p className={styles.note}>{en ? "12 destinations · 15 encounters with history" : "열두 곳의 여행지 · 열다섯 번의 역사 속 만남"}</p>
      </div>
      <figure className={styles.figure}>
        <div className={styles.image}>
          <Image src="/places/gyeongbokgung.jpg" alt={en ? "Geunjeongjeon Hall at Gyeongbokgung Palace" : "경복궁 근정전과 너른 궁궐 마당"} fill priority sizes="(max-width: 760px) 100vw, 55vw" />
          <span className={styles.imageLabel}>{en ? "SEOUL, KOREA" : "서울, 한국"}</span>
        </div>
        <figcaption><span>{en ? "01 — Gyeongbokgung Palace" : "01 — 경복궁"}</span><span>{en ? "Where a dynasty began" : "조선의 이야기가 시작된 곳"}</span></figcaption>
      </figure>
    </section>
  );
}
