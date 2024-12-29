import data from "./../../data/patientsData";
import {
  Patient,
  NonSensitivePatientInfo,
  NewPatient,
  NewEntry,
  Entry,
} from "./../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = data;
const id: string = uuid();

const getNonSensitivePatientsInfo = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getSensitivePatientsInfo = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatientEntries = (patientId: string): Entry[] => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    throw new Error(`Patient not found!`);
  }
  return patient.entries;
};

const addPatientEntry = (entry: NewEntry, patientId: string): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    throw new Error(`Patient not found!`);
  }
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatientsInfo,
  addPatient,
  getPatient,
  getSensitivePatientsInfo,
  addPatientEntry,
  getPatientEntries,
};
