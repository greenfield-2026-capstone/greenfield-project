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
            content:
              "You are a professional translator. Translate the given Korean UI text into natural English. Return only the translated English text. Do not include Korean. Do not explain.",
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