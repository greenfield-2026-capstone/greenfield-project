import { TaejoChoice } from "@/lib/chatApi";

export function TaejoChoicePanel({
  choices,
  disabled,
  onChoose,
}: {
  choices: TaejoChoice[];
  disabled: boolean;
  onChoose: (choice: TaejoChoice) => void;
}) {
  if (choices.length === 0) return null;

  return (
    <section className="mt-5">
      <p className="mb-3 font-black text-red-800">결정의 순간</p>

      <div className="grid gap-3 md:grid-cols-2">
        {choices.map((choice, index) => (
          <button
            key={`${choice.text}-${index}`}
            type="button"
            onClick={() => onChoose(choice)}
            disabled={disabled}
            className="min-h-28 rounded-2xl border border-stone-300 bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-950 hover:bg-indigo-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="text-xs font-black uppercase tracking-[0.16em] opacity-70">
              {choice.type === "nation" ? "Nation" : "Emotion"}
            </span>
            <span className="mt-2 block text-base font-black leading-snug">
              {choice.text}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
