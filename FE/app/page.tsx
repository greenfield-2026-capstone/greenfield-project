import { AirportFilter } from "@/components/filters/AirportFilter";
import { PlaceCard } from "@/components/places/PlaceCard";
import { getFilteredPlaces } from "@/lib/culture-data";
import { AirportCode } from "@/types/place";

const texts = {
  ko: {
    eyebrow: "Places",
    title: "둘러보기",
    popularPlaces: "인기 장소",
    airportRecommend: "공항 기준 추천",
  },
  en: {
    eyebrow: "Places",
    title: "Explore",
    popularPlaces: "Popular Places",
    airportRecommend: "Airport Recommendations",
  },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    airport?: AirportCode | "all";
    lang?: string;
  }>;
}) {
  const params = (await searchParams) ?? {};

  const airport = params.airport ?? "all";
  const lang = params.lang ?? "ko";

  const t = lang === "en" ? texts.en : texts.ko;

  const filteredPlaces = getFilteredPlaces(airport);

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
        </div>
      </div>

      <div className="card toolbar-card">
        <AirportFilter />

        <span className="toolbar-note">
          {airport === "all"
            ? t.popularPlaces
            : t.airportRecommend}
        </span>
      </div>

      <div className="place-grid">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} lang={lang} />
        ))}
      </div>
    </section>
  );
}