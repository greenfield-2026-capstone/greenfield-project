import { notFound } from "next/navigation";
import { EndingVideoCard } from "@/components/video/EndingVideoCard";
import { getAllPlaces, getCharacter, getPlace } from "@/lib/culture-data";

export function generateStaticParams() {
  return getAllPlaces().flatMap((place) =>
    place.characters.map((character) => ({
      placeId: place.id,
      characterId: character.id
    }))
  );
}

export default async function EndingPage({
  params,
  searchParams
}: {
  params: Promise<{ placeId: string; characterId: string }>;
  searchParams: Promise<{ result?: "good" | "bad" }>;
}) {
  const { placeId, characterId } = await params;
  const { result = "good" } = (await searchParams) ?? {};
  const place = getPlace(placeId);
  const character = getCharacter(placeId, characterId);

  if (!place || !character) notFound();

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{place.name}</p>
          <h1>마지막 장면</h1>
        </div>
      </div>
      <EndingVideoCard place={place} character={character} result={result} />
    </section>
  );
}
