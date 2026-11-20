
import { PDFParse } from "pdf-parse";
import Analysis from "../models/Analysis.js";
import analyzeResume from "../services/aiService.js";

export const analyzeResumeController = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume"
      });
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      return res.status(400).json({
        message: "Please enter a job description (at least 30 characters)"
      });
    }

    const parser = new PDFParse({
  data: req.file.buffer
});

const pdfData = await parser.getText();

const resumeText = pdfData.text.trim();

await parser.destroy();

    if (resumeText.length < 100) {
      return res.status(400).json({
        message: "Could not extract enough text. Please upload a text-based PDF."
      });
    }

    if (resumeText.length > 30000) {
      return res.status(400).json({
        message: "Resume text is too long to analyze"
      });
    }

    const result = await analyzeResume(
      resumeText,
      jobDescription.trim()
    );

    const savedAnalysis = await Analysis.create({
      fileName: req.file.originalname,
      jobDescription: jobDescription.trim(),
      ...result
    });

    res.status(200).json({
      message: "Resume analyzed successfully",
      analysis: savedAnalysis
    });

  } catch (error) {
    console.error("Resume analysis error:", error);

    res.status(500).json({
      message: "Resume analysis failed",
      error: error.message
    });
  }
};

export const getAnalysisHistory = async (req, res) => {
  try {
    const history = await Analysis.find()
      .select("-jobDescription")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch history"
    });
  }
};
