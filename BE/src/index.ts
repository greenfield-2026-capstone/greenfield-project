import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", chatRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`BE server running on http://localhost:${PORT}`);
});