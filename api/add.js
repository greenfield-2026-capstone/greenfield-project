let history = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const a = Number(req.body?.a);
    const b = Number(req.body?.b);

    console.log(" 받은 값:", { a, b });

    if (Number.isNaN(a) || Number.isNaN(b)) {
      return res.status(400).json({ error: "숫자 입력" });
    }
    const result = a + b;
    const record = { a, b, result };
    history.push(record);
    return res.status(200).json(record);
  }

  if (req.method === "GET") {
    return res.status(200).json(history);
  }

  return res.status(405).end();
}