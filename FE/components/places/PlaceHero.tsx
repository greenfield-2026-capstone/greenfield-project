"use client";
import { detailCopy } from "@/lib/detailCopy";
import { useTranslatedContent } from "@/lib/useTranslatedContent";
import { TranslationStatus } from "@/components/TranslationStatus";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/types/place";





export function PlaceHero({
  place: originalPlace,
  lang = "ko",
}: {
  place: Place;
  lang?: string;
}) {
  const translation = useTranslatedContent("place", originalPlace.id, originalPlace, lang);
  const place = translation.content;
  const {content:t} = useTranslatedContent("ui", "detail", detailCopy, lang);
  const display = place;

  return (
    <section className="place-hero">
      <TranslationStatus lang={lang} {...translation} />
      <div className="place-hero-image">
        <Image
          src={place.imageUrl}
          alt={display.name}
          fill
          priority
          sizes="(max-width: 1080px) 100vw, 58vw"
          className="media-image"
        />
      </div>

      <div className="card place-hero-copy">
        <div className="badge-row">
          <span className="badge badge-era">{display.era}</span>
          <span className="badge badge-airport">{display.airportLabel}</span>

          <span className="badge">
            {lang === "en"
              ? `${place.characters.length} ${t.people}`
              : `${place.characters.length}${t.people}`}
          </span>

          <span className="badge">
            {lang === "en"
              ? `${place.experiences.length} ${t.points}`
              : `${place.experiences.length}${t.points}`}
          </span>

          <span className="badge badge-foreigner">
            {display.foreignerNote}
          </span>
        </div>

        <h1>{display.name}</h1>

        <p className="source-title">
          {t.story} · {display.sourceTitle}
        </p>

        <p>{display.storyIntro}</p>

        <div className="highlight-list">
          {display.highlights.map((highlight: string) => (
            <span key={highlight} className="highlight-chip">
              {highlight}
            </span>
          ))}
        </div>

        <Link
          href={`/places/${place.id}/characters?lang=${lang}`}
          prefetch
          className="button-primary place-hero-cta"
        >
          {t.meet}
        </Link>

        <div className="detail-grid">
          <div>
            <span>{t.location}</span>
            <strong>{display.location}</strong>
          </div>

          <div>
            <span>{t.tags}</span>
            <strong>{display.tags.join(" · ")}</strong>
          </div>

          <div>
            <span>{t.goodPoint}</span>
            <strong>{display.buzzStat}</strong>
          </div>

          <div>
            <span>{t.together}</span>
            <strong>{display.recommendationItems.join(" · ")}</strong>
          </div>

          <div>
            <span>{t.highlight}</span>
            <strong>{display.highlights[0]}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
