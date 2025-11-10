import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import "../App.css";

function TestScreen({ questions, answers, setAnswers }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  if (questions.length === 0) {
    navigate("/", { replace: true });
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
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleFinish = () => {
    const unattempted = questions.some(
      (q) => !answers.hasOwnProperty(q.serial)
    );

    if (unattempted) {
      setShowModal(true);
    } else {
      navigate("/summary", { replace: true });
    }
  };

  const confirmFinish = () => {
    setShowModal(false);
    navigate("/summary", { replace: true });
  };

  const cancelFinish = () => {
    setShowModal(false);
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

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Unattempted Questions</h3>
            <p>You still have unattempted questions. Are you sure you want to finish?</p>
            <div className="modal-buttons">
              <button onClick={confirmFinish}>Yes, Finish</button>
              <button onClick={cancelFinish}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestScreen;
