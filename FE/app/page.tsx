import { SearchFilterBar } from "@/components/home/FilterBar";
import { HeroSection } from "@/components/home/HeroSection";
import { PlaceCard } from "@/components/places/PlaceCard";
import { getFilteredPlaces } from "@/lib/culture-data";
import { AirportCode } from "@/types/place";

const texts = {
  ko: {
    eyebrow: "Recommended Places",
    title: "지금 떠나기 좋은 역사 장소",
    empty: "조건에 맞는 장소가 없습니다. 검색어나 필터를 다시 조정해 주세요.",
  },
  en: {
    eyebrow: "Recommended Places",
    title: "Historic Places to Explore Now",
    empty: "No places match your filters. Try another keyword or category.",
  },
};

function matchesQuery(place: ReturnType<typeof getFilteredPlaces>[number], query: string) {
  if (!query) return true;
  const normalized = query.toLowerCase();
  const haystack = [
    place.name,
    place.summary,
    place.storyIntro,
    place.sourceTitle,
    place.era,
    ...place.tags,
    ...place.recommendationItems,
    ...place.characters.flatMap((character) => [
      character.name,
      character.role,
      character.summary,
      ...character.focusKeywords,
    ]),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}

function matchesCategory(
  place: ReturnType<typeof getFilteredPlaces>[number],
  category: string
) {
  if (!category || category === "all") return true;
  const target = category.toLowerCase();
  const text = [place.name, place.era, place.summary, ...place.tags]
    .join(" ")
    .toLowerCase();

  const categoryMatchers: Record<string, string[]> = {
    "궁궐": ["궁", "궁궐", "palace"],
    palace: ["궁", "궁궐", "palace"],
    "성곽": ["성곽", "산성", "화성", "fortress"],
    fortress: ["성곽", "산성", "화성", "fortress"],
    "유적지": ["유적", "역사", "heritage", "historic"],
    "historic site": ["유적", "역사", "heritage", "historic"],
    "박물관": ["박물관", "museum"],
    museum: ["박물관", "museum"],
    "자연/정원": ["정원", "숲", "산", "garden", "nature"],
    "nature/garden": ["정원", "숲", "산", "garden", "nature"],
  };

  return (categoryMatchers[target] ?? [target]).some((keyword) =>
    text.includes(keyword)
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    airport?: AirportCode | "all";
    category?: string;
    lang?: string;
    q?: string;
  }>;
}) {
  const params = (await searchParams) ?? {};

  const airport = params.airport ?? "all";
  const category = params.category ?? "all";
  const lang = params.lang ?? "ko";
  const query = params.q?.trim() ?? "";

  const t = lang === "en" ? texts.en : texts.ko;

  const filteredPlaces = getFilteredPlaces(airport).filter(
    (place) => matchesQuery(place, query) && matchesCategory(place, category)
  );

  return (
    <section className="page-section bg-[radial-gradient(circle_at_16%_0%,rgba(141,63,53,0.08),transparent_34%),linear-gradient(180deg,#FAF7F2_0%,#F8F5EF_48%,#F4EEE6_100%)]">
      <HeroSection lang={lang} />
      <SearchFilterBar lang={lang} />

      <div id="places" className="mt-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8d3f35]">
            {t.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#1d2430] sm:text-3xl">
            {t.title}
          </h2>
        </div>
        <span className="rounded-full border border-[#E6D8C5] bg-white/85 px-4 py-2 text-sm font-black text-[#1f2a5c] shadow-sm">
          {filteredPlaces.length}
        </span>
      </div>

      {filteredPlaces.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-3xl border border-[#E6D8C5] bg-white/85 p-10 text-center text-[#6b7280] shadow-sm">
          {t.empty}
        </div>
      )}
    </section>
  );
}
