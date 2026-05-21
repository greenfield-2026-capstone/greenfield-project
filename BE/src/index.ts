import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", chatRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`BE server running on http://localhost:${PORT}`);
});