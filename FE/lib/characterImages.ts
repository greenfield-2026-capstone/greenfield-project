const jeongjoBackgrounds: Record<string, string> = {
  hwaseong: "last.png",
  step1: "step1.png",
  step2: "step2(창덕궁앞뜰).png",
  gyujanggak: "step3(규장각).png",
  jonggak: "보신각.jpg",
  banquet: "step4(창덕궁희정당).png",
};

export function getStoryBackground(storyId: string, background: string): string {
  if (storyId === "jeongjo") {
    const file = jeongjoBackgrounds[background];
    return file ? `/images/jeongjo/background/${file}` : "";
  }
  return `/images/${storyId}/backgrounds/${background}.png`;
}

export function getCharacterImage(speaker: string, emotion: string | null): string | null {
  if (!emotion) return null;

  if (speaker === "young_sejong") {
    const available = ["curious", "flustered", "hurry", "pout", "scolded", "smile"];
    return `/images/sejong/young/${available.includes(emotion) ? emotion : "flustered"}.png`;
  }

  if (speaker === "sejong") {
    const available = ["angry", "neutral", "smile", "suggest", "surprised"];
    return `/images/sejong/characters/${available.includes(emotion) ? emotion : "neutral"}.png`;
  }

  if (speaker === "taejong" || speaker === "kimmun") {
    return `/images/${speaker}/${emotion}.png`;
  }

  if (speaker === "young_jeongjo") {
    const available = ["angry", "normal", "serious"];
    return `/images/jeongjo/young/${available.includes(emotion) ? emotion : "normal"}.png`;
  }

  if (speaker === "jeongjo") {
    const available = ["smile", "angry", "faint", "shout"];
    return `/images/jeongjo/characters/${available.includes(emotion) ? emotion : "normal"}.png`;
  }

  // Jeong Yak-yong has dialogue data but no portrait asset yet.
  return null;
}