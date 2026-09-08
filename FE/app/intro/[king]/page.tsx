"use client";

import { useRouter, useParams } from "next/navigation";

import IntroScene from "@/components/intro/IntroScene";

import { sejongIntro } from "@/data/intro/sejong";
// 나중에 추가
// import { taejoIntro } from "@/data/intros/taejo";
// import { jeongjoIntro } from "@/data/intros/jeongjo";

const intros = {
  sejong: sejongIntro,

  // taejo: taejoIntro,
  // jeongjo: jeongjoIntro,
};

export default function KingIntroPage() {
  const router = useRouter();
  const params = useParams();

  const king = params.king as keyof typeof intros;

  const intro = intros[king];

  // 존재하지 않는 왕이면
  if (!intro) {
    return (
      <div className="flex h-screen items-center justify-center">
        존재하지 않는 왕입니다.
      </div>
    );
  }

  return (
    <IntroScene
      data={intro}
      onComplete={() => {
        router.push(`/chat?king=${king}`);
      }}
    />
  );
}