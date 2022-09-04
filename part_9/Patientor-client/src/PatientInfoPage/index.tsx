import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setPatientListFromUrl, useStateValue } from "../state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patientDetail, setPersonDetail] = useState<Patient | null>(null);
  if (id) {
    useEffect(() => {
      dispatch({ type: "GET_PATIENT" });
      if (Object.keys(patients).length === 0) {
        const fetchPatientList = async () => {
          try {
            dispatch(await setPatientListFromUrl(`${apiBaseUrl}/patients`));
          } catch (e) {
            console.error(e);
          }
        };
        void fetchPatientList();
      }
      dispatch({ type: "GET_PATIENT" });
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
    }, [dispatch, patients]);
  }
  return (
    <div>
      <h1>
        {patientDetail?.name} {patientDetail?.gender}
      </h1>
      <div>{patientDetail?.ssn}</div>
      <div>{patientDetail?.occupation}</div>
    </div>
  );
};

export default PatientInfoPage;
