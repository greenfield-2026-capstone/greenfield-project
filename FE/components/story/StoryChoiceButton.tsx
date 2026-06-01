import { TaejoChoice } from "@/lib/chatApi";

export function StoryChoiceButton({
  choice,
  disabled,
  index,
  selected = false,
  onChoose,
}: {
  choice: TaejoChoice;
  disabled: boolean;
  index: number;
  selected?: boolean;
  onChoose: (choice: TaejoChoice) => void;
}) {
  const toneLabel = choice.type === "nation" ? "Nation" : "Emotion";
  const marker = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={() => onChoose(choice)}
      disabled={disabled}
      aria-pressed={selected}
      className={`group min-h-28 rounded-3xl border p-4 text-left shadow-sm transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f2a5c] disabled:cursor-not-allowed disabled:opacity-70 sm:p-5 ${
        selected
          ? "border-[#1f2a5c] bg-[#1f2a5c] text-white shadow-[0_18px_38px_rgba(31,42,92,0.22)]"
          : "border-[#E6D8C5] bg-white/90 text-[#1d2430] hover:-translate-y-1 hover:border-[#8d3f35]/55 hover:bg-[#FAF7F2] hover:shadow-[0_18px_38px_rgba(31,42,92,0.12)]"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-black ${
            selected
              ? "bg-white/16 text-white"
              : "bg-[#eef2fb] text-[#1f2a5c] group-hover:bg-white"
          }`}
        >
          {marker}
        </span>
        <span
          className={`text-[11px] font-black uppercase tracking-[0.18em] ${
            selected ? "text-white/70" : "text-[#8d3f35]"
          }`}
        >
          {toneLabel}
        </span>
      </span>
      <span className="mt-4 block text-base font-black leading-7">
        {choice.text}
      </span>
    </button>
  );
}
