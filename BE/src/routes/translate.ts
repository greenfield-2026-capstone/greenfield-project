import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { text, targetLanguage = "English" } = req.body;

    const response = await fetch(`${process.env.LITELLM_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LITELLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.LITELLM_MODEL,
        messages: [
          {
            role: "system",
            content: `
You are a professional translator for a historical role-playing game about Korean history.

Translate the given text into the target language naturally and clearly.

Important rules:
- Preserve the original meaning and emotion.
- Preserve the speaker's tone.
- If the speaker is a king, general, noble, or historical figure, use a dignified, solemn, royal tone.
- Do not make the language too difficult. It should still be easy for foreign tourists and international users to understand.
- For English, use natural English that foreigners commonly use, but with a slightly historical and noble feeling when the text is dialogue.
- Do not translate names too literally.
- Use "Lee Seong-gye" instead of "Yi Seong-gye".
- Use "King Taejo" when referring to 태조.
- Use "Gyeongbokgung Palace" for 경복궁.
- Use "Joseon" for 조선.
- Use "Goryeo" for 고려.
- Keep emojis and line breaks if they exist.
- Return only the translated text.
- Do not explain.
`,
          },
          {
            role: "user",
            content: `Translate this text into ${targetLanguage}: ${text}`,
          },
        ],
        temperature: 0,
      }),
    });

    const data = await response.json();

    res.json({
      translatedText: data.choices?.[0]?.message?.content?.trim() || text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Translation failed",
    });
  }
});

export default router;