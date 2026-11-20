
import express from "express";
import upload from "../middleware/upload.js";

import {
  analyzeResumeController,
  getAnalysisHistory
} from "../controllers/resumeController.js";

const router = express.Router();

router.post(
  "/analyze",
  upload.single("resume"),
  analyzeResumeController
);

router.get("/history", getAnalysisHistory);

export default router;
