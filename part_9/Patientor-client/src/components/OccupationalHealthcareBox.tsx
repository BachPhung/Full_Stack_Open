import React from "react";
import { OccupationalHealthcareEntry } from "../types";

export const OccupationalHealthcareBox: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div
      style={{
        width: "600px",
        margin: "20px",
        border: "solid black 2px",
        padding: "5px",
      }}
    >
      <div>
        {entry.date} {entry.employerName}
      </div>
      <div>{entry.description}</div>
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};
