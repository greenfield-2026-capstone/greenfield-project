import { SearchFilterBar } from "@/components/home/FilterBar";
import { ExperienceFlow } from "@/components/home/ExperienceFlow";
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
    <section className="page-section relative isolate overflow-hidden rounded-[34px] bg-[radial-gradient(circle_at_18%_0%,rgba(191,219,254,0.26),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(141,63,53,0.08),transparent_26%),linear-gradient(180deg,#ffffff_0%,#f9fbff_24%,#FAF7F2_66%,#F8F5EF_100%)] px-0 pb-8">
      <div className="pointer-events-none absolute -right-24 top-0 z-0 h-72 w-[58%] bg-[url('/assets/background/palace-roof.svg')] bg-contain bg-right-top bg-no-repeat opacity-[0.18] blur-[0.2px] [mask-image:linear-gradient(90deg,transparent_0%,black_24%,black_76%,transparent_100%)] max-md:hidden" />
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-52 w-72 bg-[url('/assets/background/cherry-blossom.svg')] bg-contain bg-right-top bg-no-repeat opacity-25 max-md:h-36 max-md:w-48 max-md:opacity-12" />
      <div className="pointer-events-none absolute inset-x-0 top-72 z-0 h-56 bg-[url('/assets/background/mountain-silhouette.svg')] bg-cover bg-center opacity-70 max-md:top-80 max-md:opacity-35" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.62)_38%,rgba(250,247,242,0.84)_100%)]" />

      <div className="relative z-10">
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
          <span className="rounded-full border border-[#E6D8C5] bg-white/85 px-4 py-2 text-sm font-black text-[#1f2a5c] shadow-sm backdrop-blur">
            {filteredPlaces.length}
          </span>
        </div>

        {filteredPlaces.length > 0 ? (
          <>
            <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} lang={lang} />
              ))}
            </div>
            <ExperienceFlow lang={lang} />
          </>
        ) : (
          <div className="mt-5 rounded-3xl border border-[#E6D8C5] bg-white/85 p-10 text-center text-[#6b7280] shadow-sm backdrop-blur">
            {t.empty}
          </div>
        )}
      </div>
    </section>
  );
}
