import { ChatMessage } from "@/lib/chatApi";

export function TaejoHistoryPanel({ messages }: { messages: ChatMessage[] }) {
  return (
    <aside className="rounded-2xl border border-white/40 bg-stone-50/90 p-5 shadow-xl backdrop-blur">
      <h2 className="text-lg font-black text-stone-950">대화 기록</h2>

      <div className="mt-4 space-y-3">
        {messages.slice(-5).map((message, index) => (
          <div key={`${message.role}-${index}`} className="rounded-xl bg-white/75 p-3 text-sm">
            <p className="font-bold text-stone-900">
              {message.role === "user"
                ? "나"
                : message.role === "assistant"
                  ? "태조 이성계"
                  : "Narration"}
            </p>
            <p className="mt-1 line-clamp-2 text-stone-600">
              {message.text}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
