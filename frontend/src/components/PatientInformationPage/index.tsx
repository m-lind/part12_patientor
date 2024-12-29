import { Patient, Gender, Diagnosis, NewEntry, Entry } from "./../../types";
import { useMatch } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { useState, useEffect } from "react";
import patientService from "./../../services/patients";
import diagnosisService from "./../../services/diagnoses";
import Details from "./Details";
import AddEntryForm from "./AddEntryForm";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const PatientInformationPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [info, setInfo] = useState<string>();
  const [type, setType] = useState<NewEntry["type"]>();

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAllSensitive();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosisList();
  }, []);

  const diagnosisCodeToName: Record<string, string> = {};
  diagnoses.map(diagnosis => {
    diagnosisCodeToName[diagnosis.code] = diagnosis.name;
  });

  const match = useMatch("/patients/:id");

  const patient = match
    ? patients.find(patient => patient.id === match.params.id)
    : null;

  const submitNewEntry = async (values: NewEntry) => {
    try {
      if (patient) {
        const entry = await patientService.createEntry(values, patient.id);
        setEntries(prevEntries => [...prevEntries, entry]);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          notifyWith(message);
        } else {
          notifyWith("Unrecognized axios error");
        }
      } else {
        notifyWith("Unknown error");
        console.error("Unknown error", e);
      }
    }
  };

  const handleTypeClick = (type: NewEntry["type"]) => {
    setType(type);
  };

  useEffect(() => {
    const fetchEntriesList = async () => {
      if (patient) {
        const entries = await patientService.getAllEntries(patient.id);
        setEntries(entries);
      }
    };
    void fetchEntriesList();
  }, [patient]);

  const notifyWith = (info: string) => {
    setInfo(info);

    setTimeout(() => {
      setInfo("");
    }, 3000);
  };

  const style = {
    borderStyle: "solid",
    borderRadius: 1,
    margin: 5,
    padding: 10,
  };

  if (patient) {
    return (
      <div>
        <h1>
          {patient.name}
          {patient.gender === Gender.Male && <MaleIcon fontSize="large" />}
          {patient.gender === Gender.Female && <FemaleIcon fontSize="large" />}
        </h1>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        {info && <Alert severity="error">{info}</Alert>}
        <Button onClick={() => handleTypeClick("Hospital")} variant="contained">
          Add hospital entry
        </Button>
        <Button
          onClick={() => handleTypeClick("HealthCheck")}
          variant="contained"
        >
          Add health check entry
        </Button>
        <Button
          onClick={() => handleTypeClick("OccupationalHealthcare")}
          variant="contained"
        >
          Add occupational healthcare entry
        </Button>
        <AddEntryForm
          onSubmit={submitNewEntry}
          entryType={type}
          diagnoses={diagnoses}
        />
        <h2>entries</h2>
        <div>
          {entries.map(entry => {
            return (
              <div style={style} key={entry.id}>
                <Details entry={entry} />
                {entry.diagnosisCodes?.map(code => {
                  return (
                    <li key={code}>
                      {code} {diagnosisCodeToName[code]}
                    </li>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default PatientInformationPage;
