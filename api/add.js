export default function handler(req, res) {
  let a, b;

  if (req.method === "GET") {
    a = Number(req.query.a);
    b = Number(req.query.b);
  } else if (req.method === "POST") {
    a = req.body?.a;
    b = req.body?.b;
  } else {
    return res.status(405).json({ error: "지원하지 않는 요청 방식입니다." });
  }

  if (
    typeof a !== "number" ||
    typeof b !== "number" ||
    Number.isNaN(a) ||
    Number.isNaN(b)
  ) {
    return res.status(400).json({ error: "숫자를 입력해주세요." });
  }

  return res.status(200).json({ result: a + b });
}