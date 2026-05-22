export type TaejoChoice = {
  text: string;
  type: "nation" | "emotion";
};

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  text: string;
};

export async function askTaejo(
  message: string,
  progress: number,
  history: ChatMessage[],
  nationScore: number,
  emotionScore: number
): Promise<{
  reply: string;
  choices: TaejoChoice[];
}> {
  const response = await fetch("http://localhost:8080/api/chat/taejo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      progress,
      history,
      nationScore,
      emotionScore,
    }),
  });

  if (!response.ok) {
    throw new Error("태조 응답 생성 실패");
  }

  return response.json();
}

export async function generateBackground(
  scene: string
): Promise<{ imageUrl: string }> {
  const response = await fetch("http://localhost:8080/api/image/background", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ scene }),
  });

  if (!response.ok) {
    throw new Error("배경 이미지 생성 실패");
  }

  return response.json();
}