
function ScoreCard({ title, score }) {
  return (
    <div className="score-card">
      <h3>{title}</h3>

      <div className="score-circle">
        <span>{score}%</span>
      </div>

      <p>
        {score >= 80
          ? "Excellent"
          : score >= 60
          ? "Good"
          : "Needs Improvement"}
      </p>
    </div>
  );
}

export default ScoreCard;
