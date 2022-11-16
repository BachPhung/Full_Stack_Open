import React from "react";
import { Entry } from "../types";
import { assertNever } from "assert-never";
import { HospitalEntryBox } from "./HospitalEntryBox";
import { HealthCheckBox } from "./HealthCheckBox";
import { OccupationalHealthcareBox } from "./OccupationalHealthcareBox";

export const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital": {
      return <HospitalEntryBox entry={entry} />;
    }
    case "HealthCheck": {
      return <HealthCheckBox entry={entry} />;
    }
    case "OccupationalHealthcare": {
      return <OccupationalHealthcareBox entry={entry} />;
    }
    default:
      return assertNever(entry);
  }
};
