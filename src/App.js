import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import "./App.css";
import SPECIALIZATIONS from "./specializations"; // ✅ JSON imported

function App() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please select a specialization.");
      return;
    }

    setError("");
    setLoading(true);
    setQuestions([]);
    setAnswers({});
    setCurrentIndex(0);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate questions.");
      }

      setQuestions(data.data.questions || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (serial, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [serial]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="app">
      <h1>🧠 MD NEET-PG Question Challenge</h1>

      <div className="input-section">
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="dropdown"
        >
          <option value="">-- Select Specialization --</option>
          {SPECIALIZATIONS.map((item) => (
            <option key={item.id} value={item.specialization}>
              {item.id}. {item.specialization}
            </option>
          ))}
        </select>

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Start Quiz"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {questions.length > 0 && (
        <div className="quiz-container">
          <QuestionCard
            q={currentQuestion}
            selected={answers[currentQuestion.serial]}
            onSelect={handleAnswerSelect}
          />

          <div className="navigation">
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              ⬅ Previous
            </button>
            <span>
              Question {currentIndex + 1} / {questions.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
            >
              Next ➡
            </button>
          </div>
        </div>
      )}

      {Object.keys(answers).length === questions.length && questions.length > 0 && (
        <div className="summary">
          <h2>✅ Quiz Completed!</h2>
          <p>
            You answered {Object.keys(answers).length} / {questions.length} questions.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
