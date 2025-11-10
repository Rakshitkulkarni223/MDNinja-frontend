import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import "../App.css";

function TestScreen({ questions, answers, setAnswers }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  if (questions.length === 0) {
    navigate("/"); // redirect to home if no questions
    return null;
  }

  const currentQuestion = questions[currentIndex];

  const handleAnswerSelect = (serial, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [serial]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/summary");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="app">
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
          <button onClick={handleNext}>
            {currentIndex === questions.length - 1 ? "Finish" : "Next ➡"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestScreen;
