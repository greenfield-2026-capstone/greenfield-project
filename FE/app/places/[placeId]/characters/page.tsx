import { notFound } from "next/navigation";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { getAllPlaces, getPlace } from "@/lib/culture-data";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  const places = getAllPlaces();
  return places.map((place) => ({ placeId: place.id }));
}

export default async function CharacterSelectPage({
  params
}: {
  params: Promise<{ placeId: string }>;
}) {
  const { placeId } = await params;
  const place = getPlace(placeId);

  if (!place) notFound();

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{place.era}</p>
          <h1>{place.name}</h1>
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
