import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function SummaryScreen({ questions, answers, setAnswers, setTopic, setQuestions }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0); // for animation

  const total = questions.length;
  const correctCount = questions.filter(
    (q) => answers[q.serial] === q.correct_answer.option
  ).length;
  const wrongCount = total - correctCount;
  const percent = Math.round((correctCount / total) * 100);

  // Determine color based on percentage
  const getStrokeColor = (percent) => {
    if (percent <= 40) return "#7f1d1d";       // dark red
    if (percent <= 70) return "#dc2626";       // red
    if (percent <= 80) return "#a3e635";       // light green
    return "#15803d";                           // green
  };

  useEffect(() => {
    // animate progress from 0 to percent
    let current = 0;
    const interval = setInterval(() => {
      if (current < percent) {
        current += 1;
        setProgress(current);
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [percent]);

  const handleRestart = () => {
    setAnswers({});
    setTopic("");
    setQuestions([]);
    navigate("/", { replace: true });
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const strokeColor = getStrokeColor(progress);

  return (
    <div className="app">
      <div className="summary">
        <h2>✅ Test Completed!</h2>

        <svg width={160} height={160} className="circular-chart">
          {/* Background circle */}
          <circle
            className="circle-bg"
            stroke="#e6e6e6"
            strokeWidth="12"
            fill="none"
            cx="80"
            cy="80"
            r={radius}
          />
          {/* Progress circle */}
          <circle
            className="circle-progress"
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            cx="80"
            cy="80"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          {/* Percentage text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy="0.3em"
            fontSize="22px"
            fill={strokeColor}
            transform="rotate(90, 80, 80)"
          >
            {progress}%
          </text>
        </svg>

        <p>
          Correct: {correctCount} | Wrong: {wrongCount}
        </p>
        
        <button className="back-to-home-button" onClick={handleRestart}>Back to Home</button>
      </div>
    </div>
  );
}

export default SummaryScreen;

