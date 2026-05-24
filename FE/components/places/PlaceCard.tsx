import Link from "next/link";
import Image from "next/image";
import { Place } from "@/types/place";

export function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="card place-card">
      <div className="place-image">
        <Image src={place.imageUrl} alt={place.name} fill sizes="(max-width: 720px) 100vw, 33vw" className="media-image" />
      </div>
      <div className="card-body">
        <div className="place-heading">
          <h3>{place.name}</h3>
          <span className="badge badge-rank">{place.rankLabel}</span>
        </div>
        <div className="badge-row">
          <span className="badge badge-era">{place.era}</span>
          <span className="badge badge-airport">{place.airportLabel}</span>
          <span className="badge">{place.characters.length}명 등장</span>
          <span className="badge">{place.experiences.length}개 포인트</span>
        </div>
        <div className="place-note-row">
          <span className="badge badge-foreigner">{place.foreignerNote}</span>
          <span className="badge badge-buzz">후기 반응 좋음</span>
        </div>
        <p className="source-title">대표 이야기 · {place.sourceTitle}</p>
        <p>{place.summary}</p>
        <p className="place-buzz-copy">{place.buzzStat}</p>
        <div className="inline-list">
          {place.recommendationItems.map((item) => (
            <span key={item} className="list-chip">
              {item}
            </span>
          ))}
        </div>
        <Link href={`/places/${place.id}`} prefetch className="button-primary">
          자세히 보기
        </Link>
      </div>
    </article>
  );
}
