import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.css";

export function HeroSection({ lang = "ko" }: { lang?: string }) {
  const en = lang === "en";
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}><span className={styles.seal} aria-hidden="true">●</span>{en ? "A JOURNEY THROUGH KOREA" : "발견하는 즐거움, 한국 역사 여행"}</p>
        <h1>{en ? <>Your next trip,<br /><em>with a story.</em></> : <>오늘의 여행,<br /><em>역사를 만나다.</em></>}</h1>
        <p className={styles.description}>{en ? "Beyond the palace gates, discover the lives that shaped Korea. Explore historic places and talk with AI historical figures." : <>가보고 싶은 장소를 찾고, 그곳의 인물을 만나보세요.<br />AI 대화로 더 가까워지는 한국의 역사 이야기.</>}</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="#places">{en ? "Explore places" : "여행지 둘러보기"}<span aria-hidden="true">↗</span></Link>
          <Link className={styles.secondary} href={`/story/gyeongbokgung/taejo?lang=${lang}`}>{en ? "Meet a historical figure" : "역사 인물 만나기"}<span aria-hidden="true">→</span></Link>
        </div>
        <p className={styles.note}>{en ? "12 destinations · 15 encounters with history" : "12개의 여행지 · 15개의 인물 이야기"}</p>
      </div>
      <figure className={styles.figure}>
        <div className={styles.image}>
          <Image src="/places/gyeongbokgung.jpg" alt={en ? "Geunjeongjeon Hall at Gyeongbokgung Palace" : "경복궁 근정전과 너른 궁궐 마당"} fill priority sizes="(max-width: 760px) 100vw, 55vw" />
          <span className={styles.imageLabel}>{en ? "SEOUL, KOREA" : "서울, 한국"}</span>
        </div>
        <figcaption><span>{en ? "Gyeongbokgung, Seoul" : "경복궁, 서울"}</span><span>{en ? "Where a dynasty began" : "조선의 이야기가 시작된 곳"}</span></figcaption>
      </figure>
    </section>
  );
}
