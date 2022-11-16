import React from "react";
import { HealthCheckEntry } from "../types";

export const HealthCheckBox: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <div
      style={{
        width: "600px",
        margin: "20px",
        border: "solid black 2px",
        padding: "5px",
      }}
    >
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      <div style={{ display: "flex" }}>
        <div>Rating: </div>
        <div
          style={{
            height: "20px",
            width: "20px",
            backgroundColor: entry.healthCheckRating < 2 ? "green" : "red",
            borderRadius: "50%",
          }}
        ></div>
      </div>
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};
