import Link from "next/link";
import Image from "next/image";
import { Place } from "@/types/place";
import { TranslatedText } from "@/components/translate/TranslatedText";

export function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="card place-card">
      <div className="place-image">
        <Image
          src={place.imageUrl}
          alt={place.name}
          fill
          sizes="(max-width: 720px) 100vw, 33vw"
          className="media-image"
        />
      </div>

      <div className="card-body">
        <div className="place-heading">
          <h3>
            <TranslatedText text={place.name} />
          </h3>

          <span className="badge badge-rank">
            <TranslatedText text={place.rankLabel} />
          </span>
        </div>

        <div className="badge-row">
          <span className="badge badge-era">
            <TranslatedText text={place.era} />
          </span>

          <span className="badge badge-airport">
            <TranslatedText text={place.airportLabel} />
          </span>

          <span className="badge">
            <TranslatedText text={`${place.characters.length}명 등장`} />
          </span>

          <span className="badge">
            <TranslatedText text={`${place.experiences.length}개 포인트`} />
          </span>
        </div>

        <div className="place-note-row">
          <span className="badge badge-foreigner">
            <TranslatedText text={place.foreignerNote} />
          </span>

          <span className="badge badge-buzz">
            <TranslatedText text="후기 반응 좋음" />
          </span>
        </div>

        <p className="source-title">
          <TranslatedText text={`대표 이야기 · ${place.sourceTitle}`} />
        </p>

        <p>
          <TranslatedText text={place.summary} />
        </p>

        <p className="place-buzz-copy">
          <TranslatedText text={place.buzzStat} />
        </p>

        <div className="inline-list">
          {place.recommendationItems.map((item) => (
            <span key={item} className="list-chip">
              <TranslatedText text={item} />
            </span>
          ))}
        </div>

        <Link href={`/places/${place.id}`} prefetch className="button-primary">
          <TranslatedText text="자세히 보기" />
        </Link>
      </div>
    </article>
  );
}