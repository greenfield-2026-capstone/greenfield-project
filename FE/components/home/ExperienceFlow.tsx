const flowCopy = {
  ko: {
    title:
      "AI 인물과 대화하며 선택지를 고르면, 스토리가 달라지고 특별한 영상까지 만날 수 있어요.",
    steps: ["AI 인물과 대화", "선택지 고르기", "스토리 분기", "영상 보기"],
  },
  en: {
    title:
      "Chat with AI figures, choose a path, and unlock a different story ending with video.",
    steps: ["Chat", "Choose", "Branch", "Watch"],
  },
};

export function ExperienceFlow({ lang = "ko" }: { lang?: string }) {
  const t = lang === "en" ? flowCopy.en : flowCopy.ko;

  return (
    <section className="mt-8 rounded-[28px] border border-[#E6D8C5] bg-white/78 p-5 shadow-[0_20px_55px_rgba(31,42,92,0.08)] backdrop-blur-xl">
      <div className="grid gap-5 lg:grid-cols-[1.25fr_2fr] lg:items-center">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#eef2fb] text-2xl text-[#1f2a5c]">
            ✦
          </span>
          <p className="text-base font-black leading-7 text-[#1f2a5c]">
            {t.title}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {t.steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#E6D8C5] bg-white text-sm font-black text-[#1f2a5c] shadow-sm">
                {index + 1}
              </div>
              <p className="text-sm font-black text-[#1d2430]">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
