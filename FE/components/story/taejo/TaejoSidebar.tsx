import { TaejoEnding } from "@/hooks/useTaejoChat";

export function TaejoSidebar({
  ending,
  emotionScore,
  maxProgress,
  nationScore,
  progress,
}: {
  ending: TaejoEnding | null;
  emotionScore: number;
  maxProgress: number;
  nationScore: number;
  progress: number;
}) {
  return (
    <aside className="rounded-2xl border border-white/40 bg-stone-50/90 p-5 shadow-xl backdrop-blur">
      <p className="text-xs font-black tracking-[0.22em] text-red-800">
        HISTOUR
      </p>

      <div className="mt-5 rounded-xl bg-stone-200 p-4 text-center">
        <img
          src="/characters/taejo.jpg"
          alt="태조 이성계"
          className="mx-auto h-52 w-full rounded-lg object-cover"
        />
        <h1 className="mt-3 text-2xl font-black text-stone-950">
          태조 이성계
        </h1>
        <p className="mt-1 text-sm text-stone-600">조선의 건국자</p>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        <InfoRow label="현재 시대" value="1392년, 고려 말" />
        <InfoRow label="현재 상황" value="새 왕조의 운명이 흔들리는 순간" />
      </div>

      <div className="mt-6 border-t border-stone-300 pt-5">
        <div className="flex items-end justify-between">
          <p className="font-black text-stone-900">진행률</p>
          <p className="text-2xl font-black text-indigo-950">
            {progress} / {maxProgress}
          </p>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-stone-300">
          <div
            className="h-full rounded-full bg-indigo-950 transition-all"
            style={{ width: `${(progress / maxProgress) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <ScoreCard label="나라 중심" value={nationScore} />
        <ScoreCard label="감정 중심" value={emotionScore} />
      </div>

      {ending && (
        <div className="mt-5 rounded-xl bg-indigo-950 p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">
            Ending
          </p>
          <p className="mt-2 text-xl font-black">
            {ending === "great" ? "Great Founder" : "Lonely Father"}
          </p>
        </div>
      )}
    </aside>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-stone-500">{label}</p>
      <p className="font-bold text-stone-950">{value}</p>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/70 p-4">
      <p className="font-bold text-stone-700">{label}</p>
      <p className="mt-1 text-2xl font-black text-stone-950">{value}</p>
    </div>
  );
}
