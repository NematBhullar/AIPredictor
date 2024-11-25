import React from "react";
import { PieChart } from "../components/PieChart"; // Import the PieChart component

export function ResultPage({ reasons = {}, scores = {}, resultVisible, onClose }) {
  if (!resultVisible) return null;

  return (
    <div className="result-page">
      <h1>Prediction Results</h1>

      {/* Donut chart displaying the class scores */}
      <PieChart scores={scores} />

      <h2>Chance of Success: <b>{(scores["Admitted"] * 100).toFixed(2)}%</b></h2>

      {/* Reasons Section */}
      <div className="feedback-container">
        {Object.keys(reasons).length > 0 && !Object.values(reasons).includes("No reason provided") ? (
          <div>
            {Object.entries(reasons).map(([key, value], index) => (
              <div key={index}>
                <span className="feedback-title">{toTitleCase(key)}</span> <span>{formatText(value)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="feedback-item">No files provided</p>
        )}
      </div>

      {/* Close Button */}
      <button
        className="finish-button"
        onClick={onClose}
      >
        Finish
      </button>
    </div>
  );
}

// https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-title-case-text
const toTitleCase = (text) => {
  const str = text.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase(); 
  return str.charAt(0).toUpperCase() + str.slice(1); 
}

const formatText = (text) => {
  // Split the string by the bullet points (lines starting with `*`)
  const items = text.split("\n").filter(item => item.trim());

  return (
    <div>
      {items.map((item, index) => {
        // Check if the item contains a bold title (marked by `**`)
        if (item.includes("**")) {
          // Split the item into title and text parts based on `**`
          item = item.replace(/\*/g, "");
          const [title, description] = item.split(":").map(part => part.trim());
          return (
            <p key={index} className="feedback-item">
              <strong>{title}:</strong> {description}
            </p>
          );
        } else {
          // For non-bold items, just return a bullet point
          return (
            <span key={index} className="feedback-item">
              <span>
                <p>{item.trim()}</p>
              </span>
            </span>
          );
        }
      })}
    </div>
  );
};
