import { Place } from "@/types/place";
import { TranslatedText } from "@/components/translate/TranslatedText";

export function ExperienceSection({ place }: { place: Place }) {
  if (!place.experiences.length) return null;

  return (
    <section className="experience-section">
      <div className="section-heading compact-top">
        <div>
          <p className="eyebrow">Spot Guide</p>
          <h2>
            <TranslatedText text="같이 보면 더 좋은 포인트" />
          </h2>
        </div>
      </div>

      <div className="experience-grid">
        {place.experiences.map((experience) => (
          <article
            key={`${place.id}-${experience.title}`}
            className="card experience-card"
          >
            <div className="experience-meta">
              <span className="badge badge-era">
                <TranslatedText text={experience.category} />
              </span>

              {experience.distance ? (
                <span className="badge">
                  <TranslatedText text={experience.distance} />
                </span>
              ) : null}

              {experience.source ? (
                <span className="badge badge-source">
                  <TranslatedText text={experience.source} />
                </span>
              ) : null}
            </div>

            <h3>
              <TranslatedText text={experience.title} />
            </h3>

            <p>
              <TranslatedText text={experience.description} />
            </p>

            <span className="experience-address">
              <TranslatedText text={experience.address} />
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}