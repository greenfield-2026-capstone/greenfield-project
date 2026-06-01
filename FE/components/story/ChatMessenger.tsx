"use client";

import { supabase } from "@/lib/supabase";

import { useState } from "react";
import { Character, Place } from "@/types/place";
import { askTaejo, ChatMessage, TaejoChoice } from "@/lib/chatApi";
import { useRouter } from "next/navigation";
import { StoryChoiceButton } from "@/components/story/StoryChoiceButton";

const TOTAL_CHAPTERS = 6;
const CONVERSATIONS_BEFORE_DECISION = 3;

const chatTexts = {
  ko: {
    available: "대화 가능",
    loading: "응답 생성 중",
    thinking: "생각 중입니다...",
    send: "전송",
    placeholder: (name: string) => `${name}에게 메시지를 입력하세요`,
    choiceMoment:
      "지금은 중요한 선택의 순간이오. 아래 선택지 중 하나를 골라 주시오.",
    choiceGuide:
      "결정의 순간입니다. 선택에 따라 이야기의 결말이 달라집니다.",
    error: "지금은 답하기 어렵소. 잠시 후 다시 말해 주시오.",
    choiceError: "그 선택은 중요하오. 잠시 후 다시 이야기해 보겠소.",
  },
  en: {
    available: "Available for conversation",
    loading: "Generating response",
    thinking: "Thinking...",
    send: "Send",
    placeholder: (name: string) => `Enter a message for ${name}`,
    choiceMoment:
      "This is an important moment of choice. Please choose one of the options below.",
    choiceGuide:
      "Decision moment. Your choice will affect the ending.",
    error: "It is difficult to answer now. Please speak again in a moment.",
    choiceError: "That choice is important. Let us speak of it again shortly.",
  },
};

const placeGuideEn: Record<string, any> = {
  gyeongbokgung: {
    name: "Gyeongbokgung Palace",
    title: "Welcome to Gyeongbokgung Palace",
  },
};

const characterGuideEn: Record<string, any> = {
  taejo: {
    name: "King Taejo Lee Seong-gye",
  },
};

function getOpeningLine(character: Character, lang: string) {
  if (lang === "en" && character.id === "taejo") {
    return `You say that you have come from a distant future.

I am Lee Seong-gye.

Goryeo has lost its strength,
and the people suffer under war and heavy taxes.

I must make an important decision for the future of this nation.

If thou wert in my place, what wouldst thou first examine?

Should we first look upon the lives of the people?
Or must we first restore order to the nation?`;
  }

  if (character.id === "taejo") {
    return `그대는 먼 훗날에서 온 사람이라 하였지.

나는 이성계라 하오.

지금 고려는 힘을 잃고,
백성들은 전쟁과 무거운 세금 때문에 힘든 삶을 살고 있소.

나라의 앞날을 위해 중요한 결정을 내려야 하오.

그대라면 먼저 무엇을 살펴보겠소?

백성들의 삶을 먼저 살펴야 한다고 생각하오?
아니면 나라의 질서를 먼저 바로잡아야 한다고 생각하오?`;
  }

  return character.openingLine;
}

function getEndingText(
  nextNationScore: number,
  nextEmotionScore: number,
  lang: string
) {
  if (lang === "en") {
    return nextNationScore >= nextEmotionScore
      ? `🏛️ Great Founder

Thou hast chosen the path that places the nation and its people first.

Through many difficult decisions,
I was able to establish the new kingdom of Joseon.

In later days, Gyeongbokgung Palace would rise in Hanyang,
becoming the central royal palace of Joseon.

If thou shouldst walk through Gyeongbokgung Palace,
remember the worries and choices that marked the beginning of a nation.

━━━━━━━━━━

📚 In actual history

King Taejo Lee Seong-gye founded Joseon in 1392
and built Gyeongbokgung Palace in Hanyang.

Gyeongbokgung Palace became the central space where the kings of Joseon governed the nation.`
      : `👑 Lonely Father

Thou hast chosen the path that values family and human feeling first.

I wished to protect those I loved,
yet such feelings led to conflict within the royal family.

In later days, Gyeongbokgung Palace became a symbol of Joseon,
but within it also remained the loneliness of the king who founded the nation.

I was a king,
yet to the end, I was also a father.

━━━━━━━━━━

📚 In actual history

King Taejo Lee Seong-gye founded Joseon,
but he came into conflict with his sons over the question of succession.

In particular, his conflict with Bangwon greatly influenced the early history of Joseon.`;
  }

  return nextNationScore >= nextEmotionScore
    ? `🏛️ Great Founder

그대는 나라와 백성을 먼저 생각하는 길을 선택했소.

나는 어려운 결정들을 지나,
새 나라 조선을 세울 수 있었소.

훗날 한양에는 경복궁이 세워졌고,
그곳은 조선의 중심 궁궐이 되었소.

그대가 경복궁을 걷게 된다면,
한 나라가 시작되던 순간의 고민을 떠올려 보시오.

━━━━━━━━━━

📚 실제 역사에서는?

태조 이성계는 1392년 조선을 세우고,
한양에 경복궁을 세웠습니다.

경복궁은 조선의 왕들이 나라를 다스리던 중심 공간이 되었습니다.`
    : `👑 Lonely Father

그대는 가족과 인간적인 마음을 먼저 생각하는 길을 선택했소.

나는 사랑하는 사람들을 지키고 싶었지만,
그 마음은 왕실의 갈등으로 이어졌소.

훗날 경복궁은 조선의 상징이 되었지만,
그 안에는 나라를 세운 왕의 외로움도 함께 남아 있소.

나는 왕이었으나,
끝까지 한 사람의 아버지이기도 했소.

━━━━━━━━━━

📚 실제 역사에서는?

태조 이성계는 조선을 세웠지만,
다음 왕을 정하는 문제로 아들들과 갈등을 겪었습니다.

특히 방원과의 갈등은 조선 초기 역사에 큰 영향을 주었습니다.`;
}

async function saveEnding(
  email: string,
  endingType: string,
  endingContent: string,
  language: string
) {
  const { error } = await supabase
    .from("story_endings")
    .insert({
      user_email: email,
      story_id: "gyeongbokgung-taejo",
      character_name:
        language === "en"
          ? "King Taejo Lee Seong-gye"
          : "태조 이성계",
      ending_type: endingType,
      ending_title:
        endingType === "great"
          ? "🏛️ Great Founder"
          : "👑 Lonely Father",
      ending_content: endingContent,
      language,
    });

  if (error) {
    console.error(error);
  }
}

export function ChatMessenger({
  place,
  character,
  progress,
  nationScore,
  emotionScore,
  setProgress,
  setNationScore,
  setEmotionScore,
}: {
  place: Place;
  character: Character;
  progress: number;
  nationScore: number;
  emotionScore: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setNationScore: React.Dispatch<React.SetStateAction<number>>;
  setEmotionScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  const language =
    typeof window !== "undefined"
      ? window.localStorage.getItem("histour-language") ?? "ko"
      : "ko";

  const t = language === "en" ? chatTexts.en : chatTexts.ko;

  const displayPlace =
    language === "en" && placeGuideEn[place.id]
      ? placeGuideEn[place.id]
      : place;

  const displayCharacter =
    language === "en" && characterGuideEn[character.id]
      ? characterGuideEn[character.id]
      : character;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: getOpeningLine(character, language),
    },
  ]);

  const [input, setInput] = useState("");
  const [choices, setChoices] = useState<TaejoChoice[]>([]);
  const [selectedChoiceText, setSelectedChoiceText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ending, setEnding] = useState<"great" | "lonely" | null>(null);
  const [conversationCount, setConversationCount] = useState(0);
  const router = useRouter();

  const handleSend = async () => {
    if (!input.trim() || isLoading || ending) return;

    if (choices.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: t.choiceMoment,
        },
      ]);
      return;
    }

    const userMessage = input.trim();
    setInput("");
    setChoices([]);

    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        role: "user",
        text: userMessage,
      },
    ];

    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const result = await askTaejo(
        userMessage,
        progress,
        nextMessages,
        nationScore,
        emotionScore,
        language
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: result.reply,
        },
      ]);

      const nextConversationCount = conversationCount + 1;
      setConversationCount(nextConversationCount);

      if (nextConversationCount >= CONVERSATIONS_BEFORE_DECISION) {
        setChoices(result.choices ?? []);
      } else {
        setChoices([]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: t.error,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoice = async (choice: TaejoChoice) => {
    if (isLoading || ending) return;

    setSelectedChoiceText(choice.text);

    const nextProgress = progress + 1;
    const nextNationScore =
      choice.type === "nation" ? nationScore + 1 : nationScore;
    const nextEmotionScore =
      choice.type === "emotion" ? emotionScore + 1 : emotionScore;

    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        role: "user",
        text: choice.text,
      },
    ];

    setProgress(nextProgress);
    setNationScore(nextNationScore);
    setEmotionScore(nextEmotionScore);
    setConversationCount(0);
    setMessages(nextMessages);
    setIsLoading(true);

    const endingText = getEndingText(
      nextNationScore,
      nextEmotionScore,
      language
    );

    if (nextProgress >= TOTAL_CHAPTERS - 1) {
      const nextEnding = nextNationScore >= nextEmotionScore ? "great" : "lonely";
      
      const savedUser = localStorage.getItem("histour-account");

       if (savedUser) {
       const user = JSON.parse(savedUser);

       await saveEnding(
      user.email,
      nextEnding,
      endingText,
      language
    );
  }
  
      setEnding(nextEnding);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: endingText,
        },
      ]);

      setChoices([]);
      setIsLoading(false);
      setSelectedChoiceText(null);

      setTimeout(() => {
        router.push(`/ending/${place.id}/${character.id}?result=${nextEnding === "great" ? "good" : "bad"}`);
      }, 200);
  
      return;
    }

    try {
      const prompt =
        language === "en"
          ? `I chose "${choice.text}". Continue the story in the dignified voice of King Taejo Lee Seong-gye. Do not create the next choices yet. End with a question that is easy for the user to answer. Use "Lee Seong-gye", "King Taejo", "Goryeo", "Joseon", and "Gyeongbokgung Palace" where appropriate.`
          : `나는 "${choice.text}"를 선택했습니다. 이 선택 이후의 상황을 태조 이성계의 말투로 이어서 말해주세요. 바로 다음 선택지는 만들지 말고, 사용자가 대답하기 쉬운 질문으로 끝내주세요.`;

      const result = await askTaejo(
        prompt,
        nextProgress,
        nextMessages,
        nextNationScore,
        nextEmotionScore,
        language
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: result.reply,
        },
      ]);

      setChoices([]);
      setConversationCount(0);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: t.choiceError,
        },
      ]);
    } finally {
      setIsLoading(false);
      setSelectedChoiceText(null);
    }
  };

  return (
    <section className="card messenger-main">
      <div className="messenger-header">
        <div>
          <strong>{displayCharacter.name}</strong>
          <span>{displayPlace.name}</span>
        </div>

        <span className="status-chip">
          {isLoading ? t.loading : t.available}
        </span>
      </div>

      <div className="story-guide-card">
        <h3>📖 {language === "en" ? displayPlace.title : "Welcome to 경복궁"}</h3>

        {language === "en" ? (
          <>
            <p>
              You have traveled back in time at{" "}
              <strong>Gyeongbokgung Palace</strong> to the era of{" "}
              <strong>Joseon</strong>'s founding.
            </p>

            <p>
              <strong>Gyeongbokgung Palace</strong> is the first great palace of{" "}
              <strong>Joseon</strong>. Joseon was a dynasty that ruled Korea for
              approximately 500 years.
            </p>

            <p>
              Before <strong>Joseon</strong> was founded, there was a kingdom
              called <strong>Goryeo</strong>. Goryeo had a long history, but by
              this time, its power was beginning to weaken.
            </p>

            <p>
              At the center of this change was General{" "}
              <strong>Lee Seong-gye</strong>, who would later become{" "}
              <strong>King Taejo</strong>, the founder and first king of Joseon.
            </p>

            <p>
              You are a traveler from the future, and through conversation with{" "}
              <strong>Lee Seong-gye</strong>, you will offer counsel on
              important decisions.
            </p>
          </>
        ) : (
          <>
            <p>
              당신은 <strong>경복궁</strong>에서 시간을 거슬러 조선 건국
              시대로 오게 되었습니다.
            </p>

            <p>
              <strong>경복궁</strong>은 <strong>조선</strong>의 첫 번째 큰
              궁궐입니다. 조선은 약 500년 동안 한국을 다스린 왕조입니다.
            </p>

            <p>
              조선이 세워지기 전에는 <strong>고려</strong>라는 나라가
              있었습니다. 고려는 오랜 역사를 가진 나라였지만, 이 시기에는 힘이
              약해지고 있었습니다.
            </p>

            <p>
              이 변화의 중심에는 장군 <strong>이성계</strong>가 있었습니다.
              이성계는 훗날 조선을 세우고 첫 번째 왕이 되는 인물입니다.
            </p>

            <p>
              당신은 미래에서 온 여행자로서 이성계와 대화하며 중요한 선택에
              조언하게 됩니다.
            </p>
          </>
        )}
      </div>

      <div className="messenger-thread">
        {messages.map((msg, index) => (
          <div
            key={`${msg.role}-${index}`}
            className={`bubble ${
              msg.role === "user" ? "bubble-user" : "bubble-npc"
            }`}
          >
            {msg.role !== "user" && <strong>{displayCharacter.name}</strong>}
            <p>{msg.text}</p>
          </div>
        ))}

        {isLoading && (
          <div className="bubble bubble-npc">
            <strong>{displayCharacter.name}</strong>
            <p>{t.thinking}</p>
          </div>
        )}
      </div>

      {choices.length > 0 && (
        <div className="mt-5 rounded-3xl border border-[#E6D8C5] bg-white/85 p-4 shadow-[0_18px_42px_rgba(31,42,92,0.08)] backdrop-blur sm:p-5">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#8d3f35]">
            {t.choiceGuide}
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            {choices.map((choice, index) => (
              <StoryChoiceButton
                key={`${choice.text}-${index}`}
                choice={choice}
                index={index}
                selected={selectedChoiceText === choice.text}
                disabled={isLoading}
                onChoose={handleChoice}
              />
            ))}
          </div>
        </div>
      )}

      {choices.length === 0 && !ending && (
        <div className="messenger-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            disabled={isLoading}
            placeholder={t.placeholder(displayCharacter.name)}
          />

          <button type="button" onClick={handleSend} disabled={isLoading}>
            {t.send}
          </button>
        </div>
      )}
    </section>
  );
}
