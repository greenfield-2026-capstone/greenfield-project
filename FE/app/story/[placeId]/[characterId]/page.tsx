import { notFound } from "next/navigation";
import { StoryClient } from "../../../../components/story/StoryClient";
import { getAllPlaces, getCharacter, getPlace } from "@/lib/culture-data";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  const places = getAllPlaces();
  return places.flatMap((place) =>
    place.characters.map((character) => ({
      placeId: place.id,
      characterId: character.id
    }))
  );
}

export default async function StoryPage({
  params
}: {
  params: Promise<{ placeId: string; characterId: string }>;
}) {
  const { placeId, characterId } = await params;
  const place = getPlace(placeId);
  const character = getCharacter(placeId, characterId);

  if (!place || !character) notFound();

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{place.name}</p>
          <h1>{character.name}</h1>
        </div>
      </div>

      <StoryClient place={place} character={character} />
    </section>
  );
}
