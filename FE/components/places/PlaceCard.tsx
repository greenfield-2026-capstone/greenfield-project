import Link from "next/link";
import Image from "next/image";
import styles from "./PlaceCard.module.css";
import { Place } from "@/types/place";

const texts = {
  ko: {
    people: "명 인물",
    points: "개 포인트",
    story: "대표 이야기",
    detail: "자세히 보기",
    airport: "공항 기준",
    route: "추천 동선",
    ai: "AI 인물",
    imageSoon: "Image coming soon",
  },
  en: {
    people: "figures",
    points: "spots",
    story: "Main Story",
    detail: "Place Details",
    airport: "Airport route",
    route: "Suggested route",
    ai: "AI figures",
    imageSoon: "Image coming soon",
  },
};

const placeEn: Record<string, any> = {
  gyeongbokgung: {
    name: "Gyeongbokgung Palace",
    rankLabel: "Popular No. 1",
    era: "Early Joseon ~ Korean Empire",
    airportLabel: "Incheon · Gimpo Airport",
    foreignerNote: "Highly satisfying for first-time visitors",
    sourceTitle:
      "Gyeonghoeru Pavilion, a Small Universe Where Humans and Heaven Meet",
    summary:
      "A place where royal spaces and traces of major events overlap, making it easy for first-time visitors to enjoy.",
    buzzStat:
      "It has clear photo spots and an easy route, making it a great choice for a first trip to Seoul.",
    recommendationItems: ["Gwanghwamun", "Gyeonghoeru", "Okhoru"],
  },
  changdeokgung: {
    name: "Changdeokgung Palace",
    rankLabel: "Popular No. 2",
    era: "Middle Joseon ~ Late Joseon",
    airportLabel: "Incheon · Gimpo Airport",
    foreignerNote: "Easy to add to a travel route",
    sourceTitle:
      "Buyongjeong Pavilion, a World of Immortals Filled with Lotus Fragrance",
    summary:
      "A palace where the rear garden, pavilions, and crown prince spaces connect, making it ideal for a slow visit.",
    buzzStat:
      "It suits travelers who prefer a quiet atmosphere over a crowded palace.",
    recommendationItems: ["Buyongjeong", "Seunghwaru", "Rear Garden Walk"],
  },
  "suwon-hwaseong": {
    name: "Suwon Hwaseong Fortress",
    rankLabel: "Popular No. 3",
    era: "Late Joseon",
    airportLabel: "Incheon · Gimpo Airport",
    foreignerNote: "Easy to add to a travel route",
    sourceTitle: "Everything About Suwon Hwaseong, Hwaseong Seongyeok Uigwe",
    summary:
      "A place that becomes much more interesting when you learn who built the city and why.",
    buzzStat:
      "Rather than one scene, this place is best enjoyed by slowly looking at the whole city.",
    recommendationItems: [
      "King Jeongjo’s Royal Procession",
      "Baedari Story",
      "Fortress Walk",
    ],
  },
  deoksugung: {
    name: "Deoksugung Palace",
    rankLabel: "Popular No. 4",
    era: "Late Joseon",
    airportLabel: "Incheon · Gimpo Airport",
    foreignerNote: "Highly satisfying for first-time visitors",
    sourceTitle: "Coffee That Captivated Emperor Gojong",
    summary:
      "A place where quiet palace scenery and traces of Western influence reveal the changing atmosphere of late Joseon.",
    buzzStat:
      "A compact palace route that pairs well with Jeong-dong and modern history.",
    recommendationItems: [
      "Deoksugung Stonewall Walk",
      "Jeong-dong",
      "Gojong's Coffee Story",
    ],
  },
  geumjeongsanseong: {
    name: "Geumjeongsanseong Fortress",
    rankLabel: "Busan Pick",
    era: "Late Joseon",
    airportLabel: "Gimhae Airport",
    foreignerNote: "Good for a quiet visit",
    sourceTitle: "Geumjeongsanseong, Korea's Largest Mountain Fortress",
    summary:
      "A Busan route where fortress walls, mountain trails, and temple stories connect into one historical landscape.",
    buzzStat:
      "Best for travelers who want a slower route beyond central Busan.",
    recommendationItems: [
      "Geumjeongsanseong Festival",
      "Fortress Trail",
      "Beomeosa Temple",
    ],
  },
  "suyeong-yaryu": {
    name: "Suyeong Yaryu",
    rankLabel: "Busan Pick",
    era: "Late Joseon",
    airportLabel: "Gimhae Airport",
    foreignerNote: "Good for a quiet visit",
    sourceTitle: "Suyeong Yaryu, Busan's First Full-Moon Mask Play",
    summary:
      "A light cultural story route that introduces Busan's mask play tradition and old fishing village culture.",
    buzzStat:
      "A distinctive local theme for travelers interested in performance and folklore.",
    recommendationItems: [
      "Gwangalli Eobang Festival",
      "Suyeong-dong",
      "Folk Stories",
    ],
  },
  "gimandeok-route": {
    name: "Kim Mandeok Route",
    rankLabel: "Jeju Pick",
    era: "Late Joseon",
    airportLabel: "Jeju Airport",
    foreignerNote: "Highly satisfying for first-time visitors",
    sourceTitle: "Kim Mandeok, the Great Merchant of Jeju",
    summary:
      "A foreigner-friendly Jeju story course connecting commerce, generosity, and old government spaces.",
    buzzStat:
      "A human-centered route that adds narrative depth to a Jeju trip.",
    recommendationItems: [
      "Jeju Mokgwana",
      "Honghwagak",
      "Kim Mandeok Story",
    ],
  },
  "chusa-yubaegil": {
    name: "Chusa Exile Trail",
    rankLabel: "Jeju Pick",
    era: "Late Joseon",
    airportLabel: "Jeju Airport",
    foreignerNote: "Easy to add to a travel route",
    sourceTitle: "Chusa Kim Jeong-hui's Exile Trail to Jeju",
    summary:
      "A route where the clear narrative of exile turns Jeju from scenery into an emotional journey.",
    buzzStat:
      "A reflective Jeju course shaped by art, writing, and displacement.",
    recommendationItems: ["Chusa Exile Trail", "Myeongwoldae", "Jeju Lore Route"],
  },
};

export function PlaceCard({
  place,
  lang = "ko",
}: {
  place: Place;
  lang?: string;
}) {
  const t = lang === "en" ? texts.en : texts.ko;
  const en = placeEn[place.id];
  const display = lang === "en" && en ? en : place;
  const hasRealImage = Boolean(place.imageUrl) && !place.imageUrl.endsWith(".svg");
  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} href={`/places/${place.id}?lang=${lang}`} aria-label={`${display.name} ${t.detail}`}>
        {hasRealImage ? <Image src={place.imageUrl} alt={display.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" className={styles.image} /> : <span className={styles.placeholder}>{display.name}</span>}
      </Link>
      <div className={styles.body}>
        <p className={styles.meta}><span>{lang === "en" && en ? display.rankLabel : place.district}</span><span>{lang === "en" ? `${place.characters.length} figures` : `인물 ${place.characters.length}명`}</span></p>
        <h3><Link href={`/places/${place.id}?lang=${lang}`}>{display.name}</Link></h3>
        <p className={styles.summary}>{display.summary}</p>
        <div className={styles.story}><span>{t.story}</span><p>{display.sourceTitle}</p></div>
        <div className={styles.bottom}><span>{display.airportLabel}</span><Link href={`/places/${place.id}?lang=${lang}`}>{t.detail}<span aria-hidden="true">↗</span></Link></div>
      </div>
    </article>
  );
}
