import { Place } from "@/types/place";

const texts = {
  ko: {
    title: "같이 보면 더 좋은 포인트",
  },
  en: {
    title: "Recommended Spots to Visit Together",
  },
};

const experienceEn: Record<string, any[]> = {
  gyeongbokgung: [
    {
      title: "Start Your Route from Gwanghwamun",
      category: "Walking Route",
      description:
        "If you are visiting for the first time, starting from Gwanghwamun makes it easier to understand the overall structure of the palace.",
      address: "172 Sejong-daero, Jongno-gu, Seoul",
      source: "Recommended Tourist Spot",
    },
    {
      title: "Compare Gyeonghoeru and Okhoru",
      category: "Story Point",
      description:
        "By looking at both the banquet space and the place marked by historical events, you can better feel the changing atmosphere of Gyeongbokgung Palace.",
      address: "161 Sajik-ro, Jongno-gu, Seoul",
      source: "Local Stories and Historical Figures",
    },
  ],
};

export function ExperienceSection({
  place,
  lang = "ko",
}: {
  place: Place;
  lang?: string;
}) {
  if (!place.experiences.length) return null;

  const t = lang === "en" ? texts.en : texts.ko;
  const experiences =
    lang === "en" && experienceEn[place.id]
      ? experienceEn[place.id]
      : place.experiences;

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