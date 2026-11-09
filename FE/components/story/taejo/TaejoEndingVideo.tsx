import { TaejoEnding } from "@/hooks/useTaejoChat";

export function TaejoEndingVideo({ ending }: { ending: TaejoEnding | null }) {
  if (!ending) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-stone-300 bg-stone-50 shadow-xl">
      <div className="border-b border-stone-200 px-5 py-3">
        <p className="font-black text-red-800">
          {ending === "great"
            ? "Great Founder Ending"
            : "Lonely Father Ending"}
        </p>
      </div>
      <video
        className="aspect-video w-full bg-black object-cover"
        controls
        autoPlay
        src={
          ending === "great"
            ? "/Great_Founder_Yi_Seonggye.mp4"
            : "/Lonely_Father_Yi_Seonggye.mp4"
        }
      />
    </section>
  );
}
