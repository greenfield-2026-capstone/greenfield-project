import { notFound } from "next/navigation";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { ExperienceSection } from "@/components/places/ExperienceSection";
import { PlaceHero } from "@/components/places/PlaceHero";
import { getAllPlaces, getPlace } from "@/lib/culture-data";

const texts = {
  ko: {
    characters: "이 장소와 이어지는 인물",
  },
  en: {
    characters: "Characters Connected to This Place",
  },
};

export const dynamicParams = false;
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  const places = getAllPlaces();
  return places.map((place) => ({ placeId: place.id }));
}

export default async function PlacePage({
  params,
  searchParams,
}: {
  params: Promise<{ placeId: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { placeId } = await params;
  const query = (await searchParams) ?? {};
  const lang = query.lang ?? "ko";

  const t = lang === "en" ? texts.en : texts.ko;

  const place = getPlace(placeId);

  if (!place) notFound();

  return (
    <section className="page-section place-detail-section">
      <PlaceHero place={place} lang={lang} />
      <ExperienceSection place={place} lang={lang} />

      <div className="section-heading compact-top">
        <div>
          <p className="eyebrow">Characters</p>
          <h2>{t.characters}</h2>
        </div>
      </div>

      <div className="character-grid">
        {place.characters.map((character) => (
          <CharacterCard
            key={character.id}
            placeId={place.id}
            character={character}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}
