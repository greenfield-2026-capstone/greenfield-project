import Link from "next/link";
import { Place } from "@/types/place";

export function PlaceHero({ place }: { place: Place }) {
  return (
    <section className="place-hero">
      <div className="place-hero-image" style={{ backgroundImage: `url("${place.imageUrl}")` }} />
      <div className="card place-hero-copy">
        <div className="badge-row">
          <span className="badge badge-era">{place.era}</span>
          <span className="badge badge-airport">{place.airportLabel}</span>
          <span className="badge">{place.characters.length}명 등장</span>
          <span className="badge">{place.experiences.length}개 현장 포인트</span>
          <span className="badge badge-foreigner">{place.foreignerNote}</span>
        </div>
        <h1>{place.name}</h1>
        <p className="source-title">대표 이야기 · {place.sourceTitle}</p>
        <p>{place.storyIntro}</p>
        <div className="highlight-list">
          {place.highlights.map((highlight) => (
            <span key={highlight} className="highlight-chip">
              {highlight}
            </span>
          ))}
        </div>
        <div className="detail-grid">
          <div>
            <span>위치</span>
            <strong>{place.location}</strong>
          </div>
          <div>
            <span>핵심 태그</span>
            <strong>{place.tags.join(" · ")}</strong>
          </div>
          <div>
            <span>이런 점이 좋아요</span>
            <strong>{place.buzzStat}</strong>
          </div>
          <div>
            <span>같이 둘러보기</span>
            <strong>{place.recommendationItems.join(" · ")}</strong>
          </div>
          <div>
            <span>한눈에 보면 좋은 장면</span>
            <strong>{place.highlights[0]}</strong>
          </div>
        </div>
        <Link href={`/places/${place.id}/characters`} className="button-primary">
          인물 만나기
        </Link>
      </div>
    </section>
  );
}
