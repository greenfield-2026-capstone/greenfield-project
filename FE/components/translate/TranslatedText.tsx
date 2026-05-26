"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
};

export function TranslatedText({ text }: Props) {
  const [translatedText, setTranslatedText] = useState(text);

  console.log("TranslatedText 렌더링됨");
  console.log("받은 text:", text);

  useEffect(() => {
    const language = window.localStorage.getItem("histour-language");

    console.log("현재 언어:", language);

    if (language !== "en") {
      console.log("영어 아님 -> 원문 표시");
      setTranslatedText(text);
      return;
    }

    async function translate() {
      try {
        console.log("번역 요청 시작");

        const res = await fetch("http://localhost:8080/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            targetLanguage: "English",
          }),
        });

        console.log("응답 상태:", res.status);

        const data = await res.json();

        console.log("응답 데이터:", data);

        if (data.translatedText) {
          setTranslatedText(data.translatedText);
        } else {
          setTranslatedText(text);
        }
      } catch (error) {
        console.error("번역 실패:", error);
        setTranslatedText(text);
      }
    }

    translate();
  }, [text]);

  return <>{translatedText}</>;
}