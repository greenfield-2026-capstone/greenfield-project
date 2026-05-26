import { ChatMessage } from "@/lib/chatApi";

const speakerLabel: Record<ChatMessage["role"], string> = {
  assistant: "태조 이성계",
  system: "Narration",
  user: "나",
};

export function TaejoThread({
  isLoading,
  messages,
}: {
  isLoading: boolean;
  messages: ChatMessage[];
}) {
  return (
    <div className="mt-5 h-[58vh] space-y-4 overflow-y-auto rounded-2xl border border-stone-300 bg-white/60 p-4">
      {messages.map((message, index) => (
        <MessageBubble key={`${message.role}-${index}`} message={message} />
      ))}

      {isLoading && (
        <div className="max-w-[78%] rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-sm">
          <p className="text-xs font-black text-stone-500">태조 이성계</p>
          <p className="mt-1 leading-relaxed text-stone-800">
            깊이 헤아리는 중입니다...
          </p>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[78%] rounded-2xl border p-4 shadow-sm",
          isUser
            ? "border-indigo-950 bg-indigo-950 text-white"
            : isAssistant
              ? "border-stone-200 bg-white/95 text-stone-900"
              : "border-amber-200 bg-amber-50/90 text-stone-700",
        ].join(" ")}
      >
        <p className="text-xs font-black opacity-70">
          {speakerLabel[message.role]}
        </p>
        <p className="mt-1 whitespace-pre-line leading-relaxed">
          {message.text}
        </p>
      </div>
    </div>
  );
}
