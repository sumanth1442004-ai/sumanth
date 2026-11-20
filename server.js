
import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "AI Resume Analyzer API is running!"
  });
});

app.use("/api/resume", resumeRoutes);

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error instanceof Error ? 400 : 500).json({
    message: error.message || "Something went wrong"
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on port ${PORT}`);
  });
};

startServer();
