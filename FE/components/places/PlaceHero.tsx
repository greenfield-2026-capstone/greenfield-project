import Link from "next/link";
import Image from "next/image";
import { Place } from "@/types/place";

const texts = {
  ko: {
    people: "명 등장",
    points: "개 현장 포인트",
    story: "대표 이야기",
    location: "위치",
    tags: "핵심 태그",
    goodPoint: "이런 점이 좋아요",
    together: "같이 둘러보기",
    highlight: "한눈에 보면 좋은 장면",
    meet: "인물 만나기",
  },
  en: {
    people: "characters",
    points: "spot points",
    story: "Main Story",
    location: "Location",
    tags: "Key Tags",
    goodPoint: "Why People Like It",
    together: "Nearby Highlights",
    highlight: "Best Scene to Notice",
    meet: "Meet Characters",
  },
};

const placeHeroEn: Record<string, any> = {
  gyeongbokgung: {
    name: "Gyeongbokgung Palace",
    era: "Early Joseon ~ Korean Empire",
    airportLabel: "Incheon · Gimpo Airport",
    foreignerNote: "Highly satisfying for first-time visitors",
    sourceTitle:
      "Gyeonghoeru Pavilion, a Small Universe Where Humans and Heaven Meet",
    storyIntro:
      "As Joseon's representative palace, Gyeongbokgung Palace is appealing because its atmosphere changes quickly, from royal banquet spaces to places marked by royal tension.",
    location: "161 Sajik-ro, Jongno-gu, Seoul",
    tags: ["Joseon", "Palace", "Royal Family", "Seoul"],
    buzzStat:
      "It has clear photo spots and an easy route, making it a great choice for a first trip to Seoul.",
    recommendationItems: ["Gwanghwamun", "Gyeonghoeru", "Okhoru"],
    highlights: ["Gyeonghoeru", "Cheongyeonru", "Okhoru"],
  },
};

export function PlaceHero({
  place,
  lang = "ko",
}: {
  place: Place;
  lang?: string;
}) {
  const t = lang === "en" ? texts.en : texts.ko;
  const en = placeHeroEn[place.id];
  const display = lang === "en" && en ? en : place;

  return (
    <section className="place-hero">
      <div className="place-hero-image">
        <Image
          src={place.imageUrl}
          alt={display.name}
          fill
          priority
          sizes="(max-width: 1080px) 100vw, 58vw"
          className="media-image"
        />
      </div>

      <div className="card place-hero-copy">
        <div className="badge-row">
          <span className="badge badge-era">{display.era}</span>
          <span className="badge badge-airport">{display.airportLabel}</span>

          <span className="badge">
            {lang === "en"
              ? `${place.characters.length} ${t.people}`
              : `${place.characters.length}${t.people}`}
          </span>

          <span className="badge">
            {lang === "en"
              ? `${place.experiences.length} ${t.points}`
              : `${place.experiences.length}${t.points}`}
          </span>

          <span className="badge badge-foreigner">
            {display.foreignerNote}
          </span>
        </div>

        <h1>{display.name}</h1>

        <p className="source-title">
          {t.story} · {display.sourceTitle}
        </p>

        <p>{display.storyIntro}</p>

        <div className="highlight-list">
          {display.highlights.map((highlight: string) => (
            <span key={highlight} className="highlight-chip">
              {highlight}
            </span>
          ))}
        </div>

        <div className="detail-grid">
          <div>
            <span>{t.location}</span>
            <strong>{display.location}</strong>
          </div>

          <div>
            <span>{t.tags}</span>
            <strong>{display.tags.join(" · ")}</strong>
          </div>

          <div>
            <span>{t.goodPoint}</span>
            <strong>{display.buzzStat}</strong>
          </div>

          <div>
            <span>{t.together}</span>
            <strong>{display.recommendationItems.join(" · ")}</strong>
          </div>

          <div>
            <span>{t.highlight}</span>
            <strong>{display.highlights[0]}</strong>
          </div>
        </div>

        <Link
          href={`/places/${place.id}/characters?lang=${lang}`}
          prefetch
          className="button-primary"
        >
          {t.meet}
        </Link>
      </div>
    </section>
  );
}