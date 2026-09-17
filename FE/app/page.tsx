import styles from "./home.module.css";
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
  const category = ["박물관", "museum"].includes((params.category ?? "").toLowerCase()) ? "all" : params.category ?? "all";
  const lang = params.lang ?? "ko";
  const query = params.q?.trim() ?? "";

  const t = lang === "en" ? texts.en : texts.ko;

  const filteredPlaces = getFilteredPlaces(airport).filter(
    (place) => matchesQuery(place, query) && matchesCategory(place, category)
  );

  return (
    <section className={`home-page ${styles.page}`}>
      <HeroSection lang={lang} />
      <div id="places" className={styles.collection}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>{lang === "en" ? "THE COLLECTION" : "발길이 닿는 곳, 이야기가 시작되는 곳"}</p>
            <h2>{lang === "en" ? "Find your next story" : "어디로 떠나볼까요"}</h2>
          </div>
          <p className={styles.count}>{lang === "en" ? `${filteredPlaces.length} places` : `총 ${filteredPlaces.length}곳`}</p>
        </div>
        <SearchFilterBar lang={lang} />
        {filteredPlaces.length > 0 ? (
          <div className={styles.grid}>
            {filteredPlaces.map((place) => <PlaceCard key={place.id} place={place} lang={lang} />)}
          </div>
        ) : <div className={styles.empty}>{t.empty}</div>}
      </div>
      <footer className={styles.footer}>
        <span>Histour<span className={styles.footerDot}>.</span></span>
        <p>{lang === "en" ? "Places hold stories. Take a moment to listen." : "장소에 담긴 시간, 당신과 이어지는 이야기."}</p>
        <a href="#">{lang === "en" ? "Back to top ↑" : "맨 위로 ↑"}</a>
      </footer>
    </section>
  );
}
