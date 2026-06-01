import { notFound } from "next/navigation";
import { StoryClient } from "../../../../components/story/StoryClient";
import { getAllPlaces, getCharacter, getPlace } from "@/lib/culture-data";

const placeEn: Record<string, string> = {
  gyeongbokgung: "Gyeongbokgung Palace",
};

const characterEn: Record<string, string> = {
  taejo: "King Taejo Lee Seong-gye",
};

export const dynamicParams = false;
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  const places = getAllPlaces();

  return places.flatMap((place) =>
    place.characters.map((character) => ({
      placeId: place.id,
      characterId: character.id,
    }))
  );
}

export default async function StoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ placeId: string; characterId: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { placeId, characterId } = await params;
  const query = (await searchParams) ?? {};
  const lang = query.lang ?? "ko";

  const place = getPlace(placeId);
  const character = getCharacter(placeId, characterId);

  if (!place || !character) notFound();

  return (
    <section className="page-section story-experience-section">
      <div className="section-heading story-experience-heading">
        <div>
          <p className="eyebrow">
            {lang === "en" ? placeEn[place.id] ?? place.name : place.name}
          </p>

          <h1>
            {lang === "en"
              ? characterEn[character.id] ?? character.name
              : character.name}
          </h1>
        </div>
      </div>

      <StoryClient place={place} character={character} />
    </section>
  );
}
