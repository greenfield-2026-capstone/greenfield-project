import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Place } from "@/types/place";

const texts = {
  ko: {
    people: "명 등장",
    points: "개 포인트",
    goodReview: "후기 반응 좋음",
    story: "대표 이야기",
    detail: "자세히 보기",
  },
  en: {
    people: "characters",
    points: "points",
    goodReview: "Great reviews",
    story: "Main Story",
    detail: "View Details",
  },
};

const placeEn: Record<string, any> = {
  gyeongbokgung: {
    name: "Gyeongbokgung Palace",
    rankLabel: "Popular No. 1",
    era: "Early Joseon ~ Korean Empire",
    airportLabel: "Incheon · Gimpo Airport",
    foreignerNote: "Highly satisfying for first-time visitors",
    sourceTitle: "Gyeonghoeru Pavilion, a Small Universe Where Humans and Heaven Meet",
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
    sourceTitle: "Buyongjeong Pavilion, a World of Immortals Filled with Lotus Fragrance",
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
    recommendationItems: ["King Jeongjo’s Royal Procession", "Baedari Story", "Fortress Walk"],
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

  return (
    <article className="card place-card">
      <div className="place-image">
        <Image
          src={place.imageUrl}
          alt={display.name}
          fill
          sizes="(max-width: 720px) 100vw, 33vw"
          className="media-image"
        />
      </div>

      <div className="card-body">
        <div className="place-heading">
          <h3>{display.name}</h3>
          <span className="badge badge-rank">{display.rankLabel}</span>
        </div>

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
        </div>

        <div className="place-note-row">
          <span className="badge badge-foreigner">{display.foreignerNote}</span>
          <span className="badge badge-buzz">{t.goodReview}</span>
        </div>

        <p className="source-title">
          {t.story} · {display.sourceTitle}
        </p>

        <p>{display.summary}</p>

        <p className="place-buzz-copy">{display.buzzStat}</p>

        <div className="inline-list">
          {display.recommendationItems.map((item: string) => (
            <span key={item} className="list-chip">
              {item}
            </span>
          ))}
        </div>

        <Link
          href={`/places/${place.id}?lang=${lang}`}
          prefetch
          className="button-primary"
        >
          {t.detail}
        </Link>
      </div>
    </article>
  );
}