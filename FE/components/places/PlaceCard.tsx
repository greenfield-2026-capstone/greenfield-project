import Link from "next/link";
import Image from "next/image";
import { Place } from "@/types/place";

const texts = {
  ko: {
    people: "명 인물",
    points: "개 포인트",
    story: "대표 이야기",
    aiStory: "AI 스토리 체험하기",
    detail: "장소 자세히",
    airport: "공항 기준",
    route: "추천 동선",
  },
  en: {
    people: "figures",
    points: "spots",
    story: "Main Story",
    aiStory: "Try AI Story",
    detail: "Place Details",
    airport: "Airport route",
    route: "Suggested route",
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
  const primaryCharacter = place.characters[0];
  const countLabel = (count: number, label: string) =>
    lang === "en" ? `${count} ${label}` : `${count}${label}`;

  return (
    <article className="group overflow-hidden rounded-[24px] border border-[#eadfce] bg-white shadow-[0_18px_40px_rgba(45,35,23,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(45,35,23,0.15)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#efe5d5]">
        <Image
          src={place.imageUrl}
          alt={display.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-black/8 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-black text-[#8d3f35] shadow-sm backdrop-blur">
          {display.rankLabel}
        </span>
        <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
          {display.era}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-black leading-tight text-[#1d2430]">
              {display.name}
            </h3>
            <p className="mt-2 text-sm font-bold text-[#8d3f35]">
              {t.airport} · {display.airportLabel}
            </p>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#5f6673]">
          {display.summary}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-[#f8f2e8] p-3">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#8d3f35]">
              AI
            </p>
            <p className="mt-1 text-sm font-black text-[#1d2430]">
              {countLabel(place.characters.length, t.people)}
            </p>
          </div>
          <div className="rounded-2xl bg-[#eef2fb] p-3">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#1f2a5c]">
              {t.route}
            </p>
            <p className="mt-1 text-sm font-black text-[#1d2430]">
              {countLabel(place.experiences.length, t.points)}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#9b7652]">
          {t.story}
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-bold leading-6 text-[#1d2430]">
          {display.sourceTitle}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {display.recommendationItems.slice(0, 3).map((item: string) => (
            <span
              key={item}
              className="rounded-full border border-[#eadfce] bg-[#fffdf8] px-3 py-1 text-xs font-bold text-[#5f4b3a]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {primaryCharacter ? (
            <Link
              href={`/story/${place.id}/${primaryCharacter.id}?lang=${lang}`}
              prefetch
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#1f2a5c] px-4 text-sm font-black text-white transition hover:bg-[#172149] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2a5c]"
            >
              {t.aiStory}
            </Link>
          ) : null}
          <Link
            href={`/places/${place.id}?lang=${lang}`}
            prefetch
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[#eadfce] bg-[#fffdf8] px-4 text-sm font-black text-[#1f2a5c] transition hover:border-[#1f2a5c]/35 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2a5c]"
          >
            {t.detail}
          </Link>
        </div>
      </div>
    </article>
  );
}
