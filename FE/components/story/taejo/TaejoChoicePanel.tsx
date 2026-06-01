import { TaejoChoice } from "@/lib/chatApi";
import { StoryChoiceButton } from "@/components/story/StoryChoiceButton";

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
      <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#8d3f35]">
        결정의 순간
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        {choices.map((choice, index) => (
          <StoryChoiceButton
            key={`${choice.text}-${index}`}
            choice={choice}
            index={index}
            disabled={disabled}
            onChoose={onChoose}
          />
        ))}
      </div>
    </section>
  );
}
