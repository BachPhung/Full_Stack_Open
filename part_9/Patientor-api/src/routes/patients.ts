import express from "express";
import patientsServ from "../services/patientsServ";
import { Entry } from "../types";
import toNewPatientEntry from "../utils";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const entries = patientsServ.getNonSSNEntries();
  res.status(200).json(entries);
});
patientRouter.get("/:id", (req, res) => {
  const patient = patientsServ.findById(req.params.id);
  if (patient) {
    res.status(200).json(patient);
  } else {
    res.status(500).json("Not found patient");
  }
});
patientRouter.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsServ.addPatient(newPatientEntry);
    res.status(200).json(addedEntry);
  } catch (err: unknown) {
    let errMessage = "Something bad happended";
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
    res.status(400).json({ error: errMessage });
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const entry = req.body as Entry;
    const result = patientsServ.addEntryToPatient(id, entry);
    res.status(200).json(result);
  } catch (err: unknown) {
    let errMessage = "Something bad happended";
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
    res.status(400).json({ error: errMessage });
  }
});

export default patientRouter;
