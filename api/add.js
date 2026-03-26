export default function handler(req, res) {
  console.log("method:", req.method);
  console.log("body:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST 요청만 가능합니다." });
  }

  try {
    const { a, b } = req.body || {};

    if (typeof a !== "number" || typeof b !== "number" || Number.isNaN(a) || Number.isNaN(b)) {
      return res.status(400).json({ error: "숫자를 입력해주세요." });
    }

    const result = a + b;
    return res.status(200).json({ result });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
  }
}