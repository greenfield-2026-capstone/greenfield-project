import { notFound } from "next/navigation";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { getAllPlaces, getPlace } from "@/lib/culture-data";

const placeEn: Record<string, { name: string; era: string }> = {
  gyeongbokgung: {
    name: "Gyeongbokgung Palace",
    era: "Early Joseon ~ Korean Empire",
  },
};

export const dynamicParams = false;
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  const places = getAllPlaces();
  return places.map((place) => ({ placeId: place.id }));
}

export default async function CharacterSelectPage({
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

  const en = placeEn[place.id];
  const display = lang === "en" && en ? en : place;

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{display.era}</p>
          <h1>{display.name}</h1>
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