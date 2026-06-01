import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat";
import authRouter from "./routes/auth";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", chatRouter);

app.get("/", (req, res) => {
  res.json({
    message: "BE server is running!",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`BE server running on port ${PORT}`);
});