import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SPECIALIZATIONS from "../specializations";
import "../App.css";

function StartScreen({ topic, setTopic, setQuestions, setAnswers }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleStartTest = async () => {
    if (!topic.trim()) {
      setError("Please select a specialization.");
      return;
    }

    setError("");
    setLoading(true);
    setQuestions([]);
    setAnswers({});

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (!data.success) throw new Error(data.error || "Failed to generate questions.");

      setQuestions(data.data.questions || []);
      navigate("/test"); // go to test screen
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
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

        <button onClick={handleStartTest} disabled={loading}>
          {loading ? "Generating..." : "Start Test"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default StartScreen;
