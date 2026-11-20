
import ScoreCard from "./ScoreCard";
import {
  CheckCircle,
  AlertCircle,
  Lightbulb,
  MessageSquare
} from "lucide-react";

function AnalysisResult({ data }) {
  if (!data) return null;

  return (
    <section className="results">
      <h2>Your Resume Analysis</h2>

      <div className="score-grid">
        <ScoreCard
          title="ATS Score"
          score={data.atsScore}
        />

        <ScoreCard
          title="Job Match"
          score={data.matchPercentage}
        />
      </div>

      <div className="result-grid">
        <div className="result-card">
          <h3><CheckCircle /> Detected Skills</h3>
          {data.skills?.map((skill, i) => (
            <span className="tag success" key={i}>
              {skill}
            </span>
          ))}
        </div>

        <div className="result-card">
          <h3><AlertCircle /> Missing Skills</h3>
          {data.missingSkills?.map((skill, i) => (
            <span className="tag warning" key={i}>
              {skill}
            </span>
          ))}
        </div>

        <div className="result-card">
          <h3><CheckCircle /> Strengths</h3>
          <ul>
            {data.strengths?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-card">
          <h3><AlertCircle /> Weaknesses</h3>
          <ul>
            {data.weaknesses?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-card">
          <h3><Lightbulb /> Suggestions</h3>
          <ul>
            {data.suggestions?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-card">
          <h3><MessageSquare /> Interview Questions</h3>
          <ul>
            {data.interviewQuestions?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AnalysisResult;
