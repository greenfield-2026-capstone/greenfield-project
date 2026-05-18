import { AirportFilter } from "@/components/filters/AirportFilter";
import { PlaceCard } from "@/components/places/PlaceCard";
import { getFilteredPlaces } from "@/lib/culture-data";
import { AirportCode } from "@/types/place";

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ airport?: AirportCode | "all" }>;
}) {
  const params = (await searchParams) ?? {};
  const airport = params.airport ?? "all";
  const filteredPlaces = getFilteredPlaces(airport);

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Places</p>
          <h1>둘러보기</h1>
        </div>
      </div>

      <div className="card toolbar-card">
        <AirportFilter />
        <span className="toolbar-note">{airport === "all" ? "인기 장소" : "공항 기준"}</span>
      </div>

      <div className="place-grid">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}
