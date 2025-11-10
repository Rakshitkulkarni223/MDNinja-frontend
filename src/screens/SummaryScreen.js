import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function SummaryScreen({ questions, answers, setAnswers, setTopic, setQuestions }) {
  const navigate = useNavigate();

  const handleRestart = () => {
    setAnswers({});
    setTopic("");
    setQuestions([]);
    navigate("/");
  };

  return (
    <div className="app">
      <div className="summary">
        <h2>✅ Test Completed!</h2>
        <p>
          You answered {Object.keys(answers).length} / {questions.length} questions.
        </p>

        <button onClick={handleRestart}>🏠 Back to Home</button>
      </div>
    </div>
  );
}

export default SummaryScreen;
