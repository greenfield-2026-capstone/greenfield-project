import Link from "next/link";

const heroCopy = {
  ko: {
    eyebrow: "HISTOUR",
    title: "이야기 속으로 떠나는 역사 여행",
    description:
      "AI 역사 인물과 대화하고, 선택에 따라 달라지는 스토리를 따라 한국의 장소를 여행처럼 경험하세요.",
    browse: "장소 둘러보기",
    chat: "AI 인물과 대화 시작",
    statPlaces: "역사 여행지",
    statStories: "인물 대화",
    statRoutes: "공항 추천 기준",
  },
  en: {
    eyebrow: "HISTOUR",
    title: "Start a Story-Led History Trip",
    description:
      "Talk with historical figures and explore Korean places through interactive story choices.",
    browse: "Browse Places",
    chat: "Start an AI Story",
    statPlaces: "Historic places",
    statStories: "Figure chats",
    statRoutes: "Airport filters",
  },
};

export function HeroSection({ lang = "ko" }: { lang?: string }) {
  const t = lang === "en" ? heroCopy.en : heroCopy.ko;

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#E6D8C5] bg-[#fbf8f3] text-[#1d2430] shadow-[0_28px_90px_rgba(31,42,92,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(141,63,53,0.12),transparent_30%),linear-gradient(115deg,#fffdf9_0%,#f7f2eb_48%,#edf2fb_100%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[58%] bg-[linear-gradient(90deg,rgba(251,248,243,0.96)_0%,rgba(251,248,243,0.58)_20%,rgba(31,42,92,0.10)_100%),url('/places/gyeongbokgung.jpg')] bg-cover bg-center lg:block" />
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-72 bg-[url('/assets/background/cherry-blossom.svg')] bg-contain bg-right-top bg-no-repeat opacity-25 sm:h-56 sm:w-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[url('/assets/background/mountain-silhouette.svg')] bg-cover bg-bottom opacity-35" />
      <div className="absolute right-8 top-8 hidden h-28 w-28 rounded-full border border-[#E6D8C5] bg-white/35 blur-sm lg:block" />

      <div className="relative grid min-h-[430px] content-end px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8d3f35]">
            {t.eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[1.06] tracking-normal text-[#1d2430] sm:text-6xl lg:text-7xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-xl text-base font-bold leading-8 text-[#5f6673] sm:text-lg">
            {t.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#places"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#1f2a5c] px-5 text-sm font-black text-white shadow-[0_16px_34px_rgba(31,42,92,0.22)] transition hover:-translate-y-0.5 hover:bg-[#172149] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2a5c]"
            >
              {t.browse}
            </Link>
            <Link
              href={`/story/gyeongbokgung/taejo?lang=${lang}`}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#E6D8C5] bg-white/80 px-5 text-sm font-black text-[#1f2a5c] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#1f2a5c]/35 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2a5c]"
            >
              {t.chat}
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[t.statPlaces, t.statStories, t.statRoutes].map((label, index) => (
            <div
              key={label}
              className="rounded-2xl border border-[#E6D8C5] bg-white/72 p-4 shadow-sm backdrop-blur"
            >
              <strong className="text-2xl font-black text-[#1f2a5c]">
                {index === 0 ? "8+" : index === 1 ? "20+" : "3"}
              </strong>
              <p className="mt-1 text-sm font-bold text-[#5f6673]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
