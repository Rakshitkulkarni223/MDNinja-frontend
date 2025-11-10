import React from "react";
import "./QuestionCard.css";

function QuestionCard({ q, selected, onSelect }) {
  const handleSelect = (option) => {
    if (!selected) onSelect(q.serial, option); // Lock answer after selection
  };

  return (
    <div className="question-card">
      <h3 className="question-text">
        {q.serial}. {q.question}
      </h3>

      <ul className="options">
        {Object.entries(q.options).map(([key, val]) => {
          const isSelected = selected === key;
          const isCorrect = q.correct_answer.option === key;
          const isWrong = isSelected && !isCorrect;

          return (
            <li
              key={key}
              className={`option 
                ${isSelected ? "selected" : ""} 
                ${isCorrect && selected ? "correct" : ""} 
                ${isWrong ? "wrong" : ""}`}
              onClick={() => handleSelect(key)}
            >
              <span className="option-key">{key})</span> {val}
            </li>
          );
        })}
      </ul>

      {selected && (
        <div className="answer-section fade-in">
          {selected === q.correct_answer.option ? (
            <p className="answer correct-text">
              ✅ <strong>Correct!</strong> {q.correct_answer.text}
            </p>
          ) : (
            <p className="answer wrong-text">
              ❌ <strong>Wrong!</strong> Correct Answer:{" "}
              {q.correct_answer.option}) {q.correct_answer.text}
            </p>
          )}
          <div className="explanation">
            <strong>Explanation:</strong> {q.explanation}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
