
import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true
    },
    jobDescription: {
      type: String,
      required: true
    },
    atsScore: {
      type: Number,
      required: true
    },
    matchPercentage: {
      type: Number,
      required: true
    },
    skills: {
      type: [String],
      default: []
    },
    missingSkills: {
      type: [String],
      default: []
    },
    strengths: {
      type: [String],
      default: []
    },
    weaknesses: {
      type: [String],
      default: []
    },
    suggestions: {
      type: [String],
      default: []
    },
    interviewQuestions: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
