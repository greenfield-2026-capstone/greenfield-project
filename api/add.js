export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST 요청만 가능합니다." });
  }

  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "숫자를 입력해주세요." });
  }
  console.log("계산 결과:", result);
  res.status(200).json({ result: a + b });
}