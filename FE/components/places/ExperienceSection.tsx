import { Place } from "@/types/place";

export function ExperienceSection({ place }: { place: Place }) {
  if (!place.experiences.length) return null;

  return (
    <section className="experience-section">
      <div className="section-heading compact-top">
        <div>
          <p className="eyebrow">Spot Guide</p>
          <h2>같이 보면 더 좋은 포인트</h2>
        </div>
      </div>

      <div className="experience-grid">
        {place.experiences.map((experience) => (
          <article key={`${place.id}-${experience.title}`} className="card experience-card">
            <div className="experience-meta">
              <span className="badge badge-era">{experience.category}</span>
              {experience.distance ? <span className="badge">{experience.distance}</span> : null}
              {experience.source ? <span className="badge badge-source">{experience.source}</span> : null}
            </div>
            <h3>{experience.title}</h3>
            <p>{experience.description}</p>
            <span className="experience-address">{experience.address}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
