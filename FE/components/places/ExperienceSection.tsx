"use client";
import { detailCopy } from "@/lib/detailCopy";
import { useTranslatedContent } from "@/lib/useTranslatedContent";
import { TranslationStatus } from "@/components/TranslationStatus";
import { Place } from "@/types/place";





export function ExperienceSection({
  place: originalPlace,
  lang = "ko",
}: {
  place: Place;
  lang?: string;
}) {
  const translation = useTranslatedContent("place", originalPlace.id, originalPlace, lang);
  const place = translation.content;
  const {content:t} = useTranslatedContent("ui", "detail", detailCopy, lang);
  const experiences = place.experiences;

  return (
    <section className="experience-section">
      <div className="section-heading compact-top">
        <div>
          <p className="eyebrow">Spot Guide</p>
          <h2>{t.title}</h2>
        </div>
      </div>

      <div className="experience-grid">
        {experiences.map((experience) => (
          <article
            key={`${place.id}-${experience.title}`}
            className="card experience-card"
          >
            <div className="experience-meta">
              <span className="badge badge-era">{experience.category}</span>

              {experience.distance ? (
                <span className="badge">{experience.distance}</span>
              ) : null}

              {experience.source ? (
                <span className="badge badge-source">{experience.source}</span>
              ) : null}
            </div>

            <h3>{experience.title}</h3>
            <p>{experience.description}</p>

            <span className="experience-address">
              {experience.address}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}