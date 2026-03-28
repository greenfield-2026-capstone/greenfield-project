export default function handler(req, res) {
  let a, b;

  if (req.method === "GET") {
    a = Number(req.query.a);
    b = Number(req.query.b);
  } else if (req.method === "POST") {
    a = Number(req.body?.a);
    b = Number(req.body?.b);
  } else {
    return res.status(405).json({ error: "지원하지 않는 요청 방식입니다." });
  }

  console.log("📥 FE에서 받은 값:", { a, b });
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: "숫자를 입력해주세요." });
  }

  const result = a + b;

  return res.status(200).json({
    a,b,result
  });
}