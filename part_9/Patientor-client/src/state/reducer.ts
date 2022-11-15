import { State } from "./state";
import { Diagnosis, Patient } from "../types";
import axios from "axios";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_STATES";
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnosis[];
    };

export const setPatientListFromUrl = async (url: string) => {
  const { data: patientList } = await axios.get<Patient[]>(url);
  return {
    payload: patientList,
    type: "SET_PATIENT_LIST",
  } as Action;
};

export const setDiagnoseListFromUrl = async (url: string) => {
  const { data: diagnosisList } = await axios.get<Diagnosis[]>(url);
  return {
    payload: diagnosisList,
    type: "SET_DIAGNOSE_LIST",
  } as Action;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "GET_STATES": {
      return {
        ...state,
      };
    }
    case "UPDATE_PATIENT": {
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    }
    case "SET_DIAGNOSE_LIST": {
      return {
        ...state,
        diagnosis: [...action.payload],
      };
    }
    default:
      return state;
  }
};
