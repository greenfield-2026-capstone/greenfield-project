import { PlacePeopleHeading } from "@/components/places/PlacePeopleHeading";
import { notFound } from "next/navigation";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { ExperienceSection } from "@/components/places/ExperienceSection";
import { PlaceHero } from "@/components/places/PlaceHero";
import { getAllPlaces, getPlace } from "@/lib/culture-data";



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



  const place = getPlace(placeId);

  if (!place) notFound();

  return (
    <section className="page-section place-detail-section">
      <PlaceHero place={place} lang={lang} />
      <ExperienceSection place={place} lang={lang} />

      <PlacePeopleHeading lang={lang} />

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
