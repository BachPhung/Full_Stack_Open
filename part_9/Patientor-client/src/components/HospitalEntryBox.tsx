import React from "react";
import { HospitalEntry } from "../types";

export const HospitalEntryBox: React.FC<{ entry: HospitalEntry }> = ({
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
      <div>{entry.discharge.criteria}</div>
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};
