import Link from "next/link";

const heroCopy = {
  ko: {
    eyebrow: "HISTOUR",
    title: "역사 인물과 만나는 여행",
    description:
      "궁궐과 성곽을 둘러보는 데서 끝나지 않고, 그 장소에 얽힌 인물과 AI 대화를 이어가며 한국사를 여행처럼 경험하세요.",
    browse: "장소 둘러보기",
    chat: "AI 인물과 대화 시작",
    statPlaces: "추천 장소",
    statStories: "AI 스토리",
    statRoutes: "공항 기준 탐색",
  },
  en: {
    eyebrow: "HISTOUR",
    title: "Travel With Historical Figures",
    description:
      "Explore palaces and heritage sites through AI conversations with the people connected to each place.",
    browse: "Browse Places",
    chat: "Start an AI Story",
    statPlaces: "Curated places",
    statStories: "AI stories",
    statRoutes: "Airport-based discovery",
  },
};

export function HeroSection({ lang = "ko" }: { lang?: string }) {
  const t = lang === "en" ? heroCopy.en : heroCopy.ko;

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-[#161d38] text-white shadow-[0_30px_80px_rgba(31,42,92,0.22)]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,48,0.88),rgba(16,24,48,0.42),rgba(16,24,48,0.18)),url('/places/gyeongbokgung.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,202,142,0.26),transparent_34%)]" />

      <div className="relative grid min-h-[430px] content-end px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f1c98c]">
            {t.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-[1.04] tracking-normal sm:text-6xl lg:text-7xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/84 sm:text-lg">
            {t.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#places"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-5 text-sm font-black text-[#1f2a5c] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#fff7ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t.browse}
            </Link>
            <Link
              href={`/story/gyeongbokgung/taejo?lang=${lang}`}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/45 bg-white/12 px-5 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t.chat}
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[t.statPlaces, t.statStories, t.statRoutes].map((label, index) => (
            <div
              key={label}
              className="rounded-2xl border border-white/20 bg-white/12 p-4 backdrop-blur"
            >
              <strong className="text-2xl font-black">
                {index === 0 ? "8+" : index === 1 ? "20+" : "3"}
              </strong>
              <p className="mt-1 text-sm font-bold text-white/75">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
