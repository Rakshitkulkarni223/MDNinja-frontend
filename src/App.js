import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./screens/StartScreen";
import TestScreen from "./screens/TestScreen";
import SummaryScreen from "./screens/SummaryScreen";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  return (
    <Router>
      <div className="app-frame">
        <div className="header">MDNinja</div>
        <div className="screen">
          <Routes>
            <Route
              path="/"
              element={
                <StartScreen
                  topic={topic}
                  setTopic={setTopic}
                  setQuestions={setQuestions}
                  setAnswers={setAnswers}
                />
              }
            />
            <Route
              path="/test"
              element={
                <TestScreen
                  questions={questions}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              }
            />
            <Route
              path="/summary"
              element={
                <SummaryScreen
                  questions={questions}
                  answers={answers}
                  setAnswers={setAnswers}
                  setTopic={setTopic}
                  setQuestions={setQuestions}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
