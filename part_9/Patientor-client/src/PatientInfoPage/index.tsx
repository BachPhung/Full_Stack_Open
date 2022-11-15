import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const [patientDetail, setPersonDetail] = useState<Patient | null>(null);
  if (id) {
    useEffect(() => {
      dispatch({ type: "GET_STATES" });
      setPersonDetail(patients[id]);
      if (!patients[id]?.ssn) {
        const fetchPatientDetails = async () => {
          try {
            const { data: singlePatientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch({ type: "ADD_PATIENT", payload: singlePatientFromApi });
          } catch (e) {
            console.error(e);
          }
        };
        void fetchPatientDetails();
      }
      if (diagnosis.length === 0) {
        const fetchDiagnosis = async () => {
          try {
            const { data: DiagnosisListFromApi } = await axios.get<Diagnosis[]>(
              `${apiBaseUrl}/diagnoses`
            );
            dispatch({
              type: "SET_DIAGNOSE_LIST",
              payload: DiagnosisListFromApi,
            });
          } catch (e) {
            console.error(e);
          }
        };
        void fetchDiagnosis();
      }
    }, [dispatch, patients, diagnosis]);
  }
  if (
    patientDetail !== null &&
    patientDetail?.entries &&
    diagnosis.length > 0
  ) {
    return (
      <div>
        <h1>
          {patientDetail?.name} {patientDetail?.gender}
        </h1>
        <div>{patientDetail?.ssn}</div>
        <div>{patientDetail?.occupation}</div>
        <h2>entries</h2>
        {patientDetail?.entries.length > 0 && (
          <div>
            <div>
              <span style={{ marginRight: "15px" }}>
                {patientDetail?.entries[0]?.date}
              </span>
              {patientDetail?.entries[0].description}
            </div>
            <ul>
              {patientDetail?.entries[0].diagnosisCodes?.map((i) => (
                <li key={i}>
                  {i} {diagnosis.find((e) => e.code === i)?.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default PatientInfoPage;
