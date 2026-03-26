export default function handler(req, res) {
  const { a, b } = req.query;

  const numA = Number(a);
  const numB = Number(b);

  if (Number.isNaN(numA) || Number.isNaN(numB)) {
    return res.status(400).json({ error: "a와 b는 숫자여야 합니다." });
  }

  return res.status(200).json({
    a: numA,
    b: numB,
    result: numA + numB,
    debug: "backend working"
  });
}