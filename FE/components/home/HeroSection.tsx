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
    <section className="relative overflow-hidden rounded-[24px] border border-[#d8c7ad]/80 bg-[#111827] text-white shadow-[0_30px_90px_rgba(17,24,39,0.22)]">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(14,21,37,0.96)_0%,rgba(24,34,58,0.88)_38%,rgba(94,70,40,0.34)_100%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[62%] bg-[linear-gradient(90deg,rgba(17,24,39,0.96)_0%,rgba(17,24,39,0.66)_34%,rgba(17,24,39,0.12)_100%),url('/places/gyeongbokgung.jpg')] bg-cover bg-center lg:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[url('/assets/background/mountain-silhouette.svg')] bg-cover bg-bottom opacity-20" />
      <div className="pointer-events-none absolute left-10 top-10 h-px w-28 bg-[#c9a96b]/70" />
      <div className="pointer-events-none absolute bottom-10 right-10 hidden h-px w-40 bg-[#c9a96b]/60 lg:block" />

      <div className="relative grid min-h-[430px] content-end px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#d6b778]">
            {t.eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[1.06] tracking-normal text-white sm:text-6xl lg:text-7xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-white/76 sm:text-lg">
            {t.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#places"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d6b778] px-5 text-sm font-black text-[#121827] shadow-[0_18px_38px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:bg-[#e3c98c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6b778]"
            >
              {t.browse}
            </Link>
            <Link
              href={`/story/gyeongbokgung/taejo?lang=${lang}`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/18 bg-white/10 px-5 text-sm font-black text-white shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#d6b778]/55 hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6b778]"
            >
              {t.chat}
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[t.statPlaces, t.statStories, t.statRoutes].map((label, index) => (
            <div
              key={label}
              className="rounded-2xl border border-white/12 bg-white/[0.08] p-4 shadow-sm backdrop-blur"
            >
              <strong className="text-2xl font-black text-[#f0d99f]">
                {index === 0 ? "12" : index === 1 ? "15" : "4"}
              </strong>
              <p className="mt-1 text-sm font-bold text-white/68">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
