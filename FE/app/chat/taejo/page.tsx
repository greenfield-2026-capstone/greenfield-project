"use client";

import { TaejoChoicePanel } from "@/components/story/taejo/TaejoChoicePanel";
import { TaejoComposer } from "@/components/story/taejo/TaejoComposer";
import { TaejoEndingVideo } from "@/components/story/taejo/TaejoEndingVideo";
import { TaejoHistoryPanel } from "@/components/story/taejo/TaejoHistoryPanel";
import { TaejoSidebar } from "@/components/story/taejo/TaejoSidebar";
import { TaejoThread } from "@/components/story/taejo/TaejoThread";
import { useTaejoChat } from "@/hooks/useTaejoChat";

export default function TaejoChatPage() {
  const chat = useTaejoChat();

  return (
    <main className="min-h-screen bg-stone-950 px-4 py-5 text-stone-950 sm:px-6 lg:px-8">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.28), rgba(255,255,255,0.28)), url('/places/gyeongbokgung.jpg')",
        }}
      />
      <div className="fixed inset-0 bg-stone-950/20" />

      <section className="relative z-10 mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-[320px_minmax(0,1fr)_280px]">
        <TaejoSidebar
          ending={chat.ending}
          emotionScore={chat.emotionScore}
          maxProgress={chat.maxProgress}
          nationScore={chat.nationScore}
          progress={chat.progress}
        />

        <section className="rounded-2xl border border-white/40 bg-stone-50/90 p-5 shadow-xl backdrop-blur">
          <header className="flex flex-col gap-3 border-b border-stone-300 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-800">
                Interactive Story
              </p>
              <h1 className="mt-1 text-2xl font-black text-stone-950">
                태조 이성계와 대화하기
              </h1>
              <p className="mt-1 text-sm text-stone-600">
                선택에 따라 이야기와 엔딩이 달라집니다.
              </p>
            </div>

            <button
              type="button"
              onClick={chat.restart}
              className="w-fit rounded-full bg-indigo-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-900"
            >
              다시 시작
            </button>
          </header>

          <TaejoThread isLoading={chat.isLoading} messages={chat.messages} />

          {!chat.ending && (
            <>
              <TaejoChoicePanel
                choices={chat.choices}
                disabled={chat.isLoading}
                onChoose={chat.choose}
              />
              <TaejoComposer
                disabled={chat.isLoading}
                input={chat.input}
                onChange={chat.setInput}
                onSend={chat.sendMessage}
              />
            </>
          )}

          <div className="mt-5 lg:hidden">
            <TaejoEndingVideo ending={chat.ending} />
          </div>
        </section>

        <div className="space-y-5">
          <TaejoHistoryPanel messages={chat.messages} />
          <div className="hidden lg:block">
            <TaejoEndingVideo ending={chat.ending} />
          </div>
        </div>
      </section>
    </main>
  );
}
