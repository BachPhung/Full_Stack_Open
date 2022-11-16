import PatientEntries from "../data/patients";
import NonSSNEntries, { Entry, NewPatientEntry, PatientEntry } from "../types";
import { v1 as uuid } from "uuid";
const patients: Array<PatientEntry> = PatientEntries;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSSNEntries = (): Array<NonSSNEntries> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
const findById = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (id: string, entry: Entry): PatientEntry | Error => {
  const findPatient = patients.find((patient) => patient.id === id);
  if (findPatient === undefined) {
    throw new Error(`Not found patient with id ${id}`);
  }
  findPatient.entries = findPatient.entries.concat(entry);
  return findPatient;
};

export default {
  getEntries,
  addPatient,
  getNonSSNEntries,
  findById,
  addEntryToPatient,
};
