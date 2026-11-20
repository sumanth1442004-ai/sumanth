
import { useState } from "react";
import axios from "axios";
import { Upload, FileText, LoaderCircle } from "lucide-react";
import AnalysisResult from "./AnalysisResult";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (e) => {
    e.preventDefault();

    setError("");
    setAnalysis(null);

    if (!file) {
      setError("Please select your resume PDF.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume/analyze`,
        formData
      );

      setAnalysis(response.data.analysis);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to analyze resume. Check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="analyzer" className="analyzer">
      <form onSubmit={handleAnalyze}>
        <h2>Analyze Your Resume</h2>

        <label>Upload Resume (PDF)</label>

        <div className="upload-box">
          <Upload size={35} />

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              setFile(e.target.files[0] || null);
              setAnalysis(null);
              setError("");
            }}
          />

          <p>
            {file ? file.name : "Choose your PDF resume"}
          </p>

          <small>Maximum file size: 5 MB</small>
        </div>

        <label>Job Description</label>

        <textarea
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => {
            setJobDescription(e.target.value);
            setAnalysis(null);
          }}
          rows="7"
        />

        {error && (
          <p className="error">{error}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle className="spin" />
              Analyzing...
            </>
          ) : (
            <>
              <FileText size={20} />
              Analyze Resume
            </>
          )}
        </button>
      </form>

      {analysis && (
        <AnalysisResult data={analysis} />
      )}
    </div>
  );
}

export default UploadResume;
