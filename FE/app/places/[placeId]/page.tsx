import { notFound } from "next/navigation";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { ExperienceSection } from "@/components/places/ExperienceSection";
import { PlaceHero } from "@/components/places/PlaceHero";
import { getAllPlaces, getPlace } from "@/lib/culture-data";

export function generateStaticParams() {
  return getAllPlaces().map((place) => ({ placeId: place.id }));
}

export default async function PlacePage({ params }: { params: Promise<{ placeId: string }> }) {
  const { placeId } = await params;
  const place = getPlace(placeId);

  if (!place) notFound();

  return (
    <section className="page-section">
      <PlaceHero place={place} />
      <ExperienceSection place={place} />

      <div className="section-heading compact-top">
        <div>
          <p className="eyebrow">Characters</p>
          <h2>이 장소와 이어지는 인물</h2>
        </div>
      </div>

      <div className="character-grid">
        {place.characters.map((character) => (
          <CharacterCard key={character.id} placeId={place.id} character={character} />
        ))}
      </div>
    </section>
  );
}
