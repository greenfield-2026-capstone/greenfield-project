const jeongjoBackgrounds: Record<string, string> = {
  hwaseong: "last.png",
  step1: "step1.png",
  step2: "step2(창덕궁앞뜰).png",
  gyujanggak: "step3(규장각).png",
  jonggak: "보신각.jpg",
  banquet: "step4(창덕궁희정당).png",
};

export function getStoryBackground(storyId: string, background: string): string {
  // Existing Gyeongbokgung photo is atmosphere, not a 1395 reconstruction.
  if (storyId === "taejo") return background === "hanyang" ? "/places/gyeongbokgung.jpg" : "/images/taejo/background/neutral.svg";
  // Hahoe photo is atmosphere only; it does not reconstruct a specific lifetime residence.
  if (storyId === "ryu_seongryong") return background === "hahoe" ? "https://minio.nculture.org/amsweb-opt/multimedia_assets/146/85841/93920/c/%ED%95%98%ED%9A%8C%EB%A7%88%EC%9D%84-%EC%B6%A9%ED%9A%A8%EB%8B%B9-%286%29_rev-thumb.jpg" : "/images/ryu_seongryong/background/neutral.svg";
  // Temporary existing scenery; dedicated Yulgok chapter art can replace it later.
  if (storyId === "yulgok") return background === "ojukheon"
    ? "https://minio.nculture.org/amsweb-opt/multimedia_assets/106/72785/68625/c/강릉-오죽헌-내부_문화재청_제1유형-thumb.jpg"
    : background === "court" ? "/places/changdeokgung.jpg" : "";
  if (storyId === "sinsaimdang") {
    const available = ["step1", "step2", "step3", "step4", "step5"];
    return `/images/shinsaimdang/background/${available.includes(background) ? background : "step1"}.png`;
  }
  if (storyId === "kim_jeonghee") return "/places/chusa-yubaegil.jpeg";
  if (storyId === "heungseon") {
    // Existing scenery is temporary until dedicated Unhyeongung/Seokpajeong assets arrive.
    return background === "room" ? "/images/gojong/background/step2.png" : "/places/changdeokgung.jpg";
  }
  if (storyId === "mandeok") {
    // Temporary existing scenery until dedicated Mandeok backgrounds are supplied.
    return background === "palace" ? "/places/changdeokgung.jpg" : "/places/gimandeok-route.png";
  }
  if (storyId === "gojong") {
    const available = ["step1-1", "step1-2", "step2", "step3", "step4", "step5", "step6"];
    return available.includes(background) ? `/images/gojong/background/${background}.png` : "";
  }
  if (storyId === "jeongjo") {
    const file = jeongjoBackgrounds[background];
    return file ? `/images/jeongjo/background/${file}` : "";
  }
  return `/images/${storyId}/backgrounds/${background}.png`;
}

export function getCharacterImage(
  speaker: string,
  emotion: string | null,
  context?: { storyId: string; turn: number },
): string | null {
  // Existing portrait is temporary for every age/expression until sprites are supplied.
  if (speaker === "taejo") return "/characters/taejo.jpg";
  if (["ryu_seongryong", "ryu_unryong", "seongryong_student"].includes(speaker)) return "/character-fallback.svg";
  if (["yulgok", "young_yulgok", "yulgok_friend", "seonjo"].includes(speaker)) return "/character-fallback.svg";
  // Dedicated Mandeok expression assets have not been supplied yet.
  if (speaker === "mandeok" || speaker === "mandeok_merchant") return "/character-fallback.svg";
  // Dedicated expression artwork can replace this existing portrait later.
  if (speaker === "kim_jeonghee") return "/characters/chusa.jpg";
  if (speaker === "chusa_student") return "/character-fallback.svg";
  if (["sinsaimdang", "young_sinsaimdang", "saimdang_mother", "yi_wonsu", "saimdang_child"].includes(speaker)) {
    // No dedicated portraits have been supplied for these characters yet.
    return "/character-fallback.svg";
  }
  if (speaker === "young_gojong") {
    const available = ["curious", "surprised", "fear", "rely"];
    return `/images/gojong/young/${emotion && available.includes(emotion) ? emotion : "curious"}.png`;
  }
  if (speaker === "gojong") {
    if (context?.storyId === "gojong" && (context.turn === 2 || context.turn === 3)) {
      const royalEmotions = ["sorry", "firm", "worried", "shocked"];
      return `/images/gojong/royal/${emotion && royalEmotions.includes(emotion) ? emotion : "firm"}.png`;
    }
    const available = ["sorry", "firm", "worried", "shocked", "smile"];
    return `/images/gojong/characters/${emotion && available.includes(emotion) ? emotion : "firm"}.png`;
  }
  if (speaker === "heungseon") {
    const available = ["serious", "warm", "stern", "hurt"];
    return `/images/heungseon/characters/${emotion && available.includes(emotion) ? emotion : "serious"}.png`;
  }
  if (speaker === "queen_dowager_jo") {
    const available = ["solemn", "gentle"];
    return `/images/queen_sinjeong/${emotion && available.includes(emotion) ? emotion : "solemn"}.png`;
  }
  if (speaker === "jeongyakyong") {
    const available = ["curious", "difficult", "fed_up", "flustered", "normal"];
    return `/images/jeongyakyong/${emotion && available.includes(emotion) ? emotion : "normal"}.png`;
  }

  if (!emotion) return null;

  if (speaker === "young_sejong") {
    const available = ["curious", "flustered", "hurry", "pout", "scolded", "smile"];
    return `/images/sejong/young/${available.includes(emotion) ? emotion : "flustered"}.png`;
  }

  if (speaker === "sejong") {
    const available = ["angry", "neutral", "smile", "suggest", "surprised"];
    return `/images/sejong/characters/${available.includes(emotion) ? emotion : "neutral"}.png`;
  }

  if (speaker === "kimmun") {
    const available = ["neutral", "smile", "surprised", "nagging"];
    return `/images/kimmun/${emotion && available.includes(emotion) ? emotion : "neutral"}.png`;
  }
  if (speaker === "taejong") {
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

  return null;
}