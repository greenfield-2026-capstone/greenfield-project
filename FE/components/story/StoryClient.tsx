"use client";

import { useState } from "react";
import { Character, Place } from "@/types/place";
import { CharacterInfoPanel } from "./CharacterInfoPanel";
import { ChatMessenger } from "./ChatMessenger";
import { useSearchParams } from "next/navigation";

export function StoryClient({
  place,
  character,
}: {
  place: Place;
  character: Character;
}) {
  const [progress, setProgress] = useState(0);
  const [nationScore, setNationScore] = useState(0);
  const [emotionScore, setEmotionScore] = useState(0);
  
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") ?? "ko";

  return (
    <div className="messenger-layout">
      <CharacterInfoPanel
      place={place}
      character={character}
      progress={progress}
      nationScore={nationScore}
      emotionScore={emotionScore}
      lang={lang}
      />

      <ChatMessenger
        place={place}
        character={character}
        progress={progress}
        nationScore={nationScore}
        emotionScore={emotionScore}
        setProgress={setProgress}
        setNationScore={setNationScore}
        setEmotionScore={setEmotionScore}
      />
    </div>
  );
}