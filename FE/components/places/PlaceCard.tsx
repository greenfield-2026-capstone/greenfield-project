import Link from "next/link";
import Image from "next/image";
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

function PlaceImageFallback({
  label,
  placeId,
}: {
  label: string;
  placeId: string;
}) {
  const scenicTone =
    placeId === "gimandeok-route"
      ? "from-[#e8f0ef] via-[#d8e3da] to-[#b7c8b9]"
      : "from-[#f2eadc] via-[#e6d8c5] to-[#cdbb9e]";

  return (
    <div
      aria-label="image placeholder"
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${scenicTone}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.62),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(31,42,92,0.16),transparent_30%),linear-gradient(180deg,transparent_0%,rgba(29,36,48,0.50)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1d2430]/65 to-transparent" />
      <div className="absolute left-5 top-5 rounded-full border border-white/40 bg-white/55 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#1f2a5c] backdrop-blur">
        {label}
      </div>
    </div>
  );
}

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
  const countLabel = (count: number, label: string) =>
    lang === "en" ? `${count} ${label}` : `${count}${label}`;
  const hasRealImage = Boolean(place.imageUrl) && !place.imageUrl.endsWith(".svg");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#ded1bd] bg-[#fffdf8] shadow-[0_18px_46px_rgba(25,22,17,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#c8aa70]/70 hover:shadow-[0_28px_70px_rgba(25,22,17,0.15)]">
      <div className="relative h-[250px] overflow-hidden bg-[#ede4d5]">
        {hasRealImage ? (
          <Image
            src={place.imageUrl}
            alt={display.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceImageFallback
            label={t.imageSoon}
            placeId={place.id}
          />
        )}
        <div
          className={
            hasRealImage
              ? "absolute inset-0 bg-gradient-to-t from-[#0f172a]/78 via-[#0f172a]/18 to-transparent"
              : "absolute inset-0 bg-gradient-to-t from-[#101830]/10 via-transparent to-transparent"
          }
        />
        <span className="absolute left-5 top-5 rounded-full border border-white/18 bg-[#111827]/70 px-3 py-1.5 text-[11px] font-black text-[#f1d697] shadow-sm backdrop-blur">
          {display.rankLabel}
        </span>
        <button
          type="button"
          aria-label={`${display.name} 저장`}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/22 bg-[#111827]/48 text-lg text-white shadow-sm backdrop-blur transition hover:scale-105 hover:bg-[#111827]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          ♡
        </button>

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <h3 className="text-2xl font-black leading-tight drop-shadow sm:text-3xl">
            {display.name}
          </h3>
          <p className="mt-2 max-w-md line-clamp-1 text-sm font-semibold leading-6 text-white/82">
            {display.foreignerNote}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/14 px-3 py-1.5 text-xs font-bold text-white/92 shadow-sm backdrop-blur">
              {display.airportLabel}
            </span>
            <span className="rounded-full bg-white/14 px-3 py-1.5 text-xs font-bold text-white/92 shadow-sm backdrop-blur">
              {t.ai} {place.characters.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-2 text-sm leading-7 text-[#5d6470]">
          {display.summary}
        </p>

        <p className="mt-5 text-[11px] font-black uppercase tracking-[0.18em] text-[#a37b3d]">
          {t.story}
        </p>
        <p className="mt-1 line-clamp-1 text-sm font-black leading-6 text-[#171f2d]">
          {display.sourceTitle}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {display.recommendationItems.slice(0, 2).map((item: string) => (
            <span
              key={item}
              className="rounded-full border border-[#e0d3bd] bg-[#f8f3ea] px-3 py-1 text-xs font-bold text-[#66543e]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <Link
            href={`/places/${place.id}?lang=${lang}`}
            prefetch
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#111827] px-4 text-sm font-black text-white shadow-[0_16px_30px_rgba(17,24,39,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1f2937] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111827]"
          >
            {t.detail}
          </Link>
        </div>
      </div>
    </article>
  );
}
