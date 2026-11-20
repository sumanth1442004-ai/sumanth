
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const analyzeResume = async (resumeText, jobDescription) => {
  const prompt = `
You are an expert resume reviewer and career assistant.

Analyze the following resume against the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY valid JSON with this exact structure:

{
  "atsScore": 75,
  "matchPercentage": 70,
  "skills": ["React", "Node.js"],
  "missingSkills": ["AWS", "Docker"],
  "strengths": ["Good technical foundation"],
  "weaknesses": ["Missing measurable achievements"],
  "suggestions": ["Add project metrics"],
  "interviewQuestions": [
    "Explain React hooks",
    "What is REST API?"
  ]
}

Rules:
- atsScore must be between 0 and 100.
- matchPercentage must be between 0 and 100.
- Use evidence from the resume and job description.
- Do not invent qualifications or experience.
- Return useful, realistic feedback.
- If information is unavailable, say so.
`;

  const response = await ai.models.generateContent({
 model: "gemini-3.8-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const result = JSON.parse(response.text);

  const score = Number(result.atsScore);
  const match = Number(result.matchPercentage);

  if (
    !Number.isFinite(score) ||
    !Number.isFinite(match) ||
    score < 0 || score > 100 ||
    match < 0 || match > 100
  ) {
    throw new Error("AI returned invalid scores");
  }

  const arrayFields = [
    "skills",
    "missingSkills",
    "strengths",
    "weaknesses",
    "suggestions",
    "interviewQuestions"
  ];

  for (const field of arrayFields) {
    if (!Array.isArray(result[field])) {
      throw new Error(`AI returned invalid ${field}`);
    }
  }

  return {
    ...result,
    atsScore: score,
    matchPercentage: match
  };
};

export default analyzeResume;
