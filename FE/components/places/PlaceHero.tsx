import Link from "next/link";
import Image from "next/image";
import { Place } from "@/types/place";
import { TranslatedText } from "@/components/translate/TranslatedText";

export function PlaceHero({ place }: { place: Place }) {
  return (
    <section className="place-hero">
      <div className="place-hero-image">
        <Image
          src={place.imageUrl}
          alt={place.name}
          fill
          priority
          sizes="(max-width: 1080px) 100vw, 58vw"
          className="media-image"
        />
      </div>

      <div className="card place-hero-copy">
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
            <TranslatedText text={`${place.experiences.length}개 현장 포인트`} />
          </span>

          <span className="badge badge-foreigner">
            <TranslatedText text={place.foreignerNote} />
          </span>
        </div>

        <h1>
          <TranslatedText text={place.name} />
        </h1>

        <p className="source-title">
          <TranslatedText text={`대표 이야기 · ${place.sourceTitle}`} />
        </p>

        <p>
          <TranslatedText text={place.storyIntro} />
        </p>

        <div className="highlight-list">
          {place.highlights.map((highlight) => (
            <span key={highlight} className="highlight-chip">
              <TranslatedText text={highlight} />
            </span>
          ))}
        </div>

        <div className="detail-grid">
          <div>
            <span>
              <TranslatedText text="위치" />
            </span>
            <strong>
              <TranslatedText text={place.location} />
            </strong>
          </div>

          <div>
            <span>
              <TranslatedText text="핵심 태그" />
            </span>
            <strong>
              <TranslatedText text={place.tags.join(" · ")} />
            </strong>
          </div>

          <div>
            <span>
              <TranslatedText text="이런 점이 좋아요" />
            </span>
            <strong>
              <TranslatedText text={place.buzzStat} />
            </strong>
          </div>

          <div>
            <span>
              <TranslatedText text="같이 둘러보기" />
            </span>
            <strong>
              <TranslatedText text={place.recommendationItems.join(" · ")} />
            </strong>
          </div>

          <div>
            <span>
              <TranslatedText text="한눈에 보면 좋은 장면" />
            </span>
            <strong>
              <TranslatedText text={place.highlights[0]} />
            </strong>
          </div>
        </div>

        <Link
          href={`/places/${place.id}/characters`}
          prefetch
          className="button-primary"
        >
          <TranslatedText text="인물 만나기" />
        </Link>
      </div>
    </section>
  );
}