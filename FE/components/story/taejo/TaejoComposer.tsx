export function TaejoComposer({
  disabled,
  input,
  onChange,
  onSend,
}: {
  disabled: boolean;
  input: string;
  onChange: (value: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="mt-5 flex gap-3">
      <input
        value={input}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSend();
        }}
        placeholder="이성계에게 말을 걸어보세요..."
        className="min-w-0 flex-1 rounded-xl border border-stone-300 bg-white/90 px-4 py-3 outline-none transition focus:border-indigo-950 focus:ring-2 focus:ring-indigo-950/15"
      />

      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !input.trim()}
        className="rounded-xl bg-indigo-950 px-6 py-3 font-bold text-white transition hover:bg-indigo-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        보내기
      </button>
    </div>
  );
}
