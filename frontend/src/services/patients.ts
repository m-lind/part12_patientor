import axios from "axios";
import { Patient, PatientFormValues, NewEntry, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getAllSensitive = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients/sensitive`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getAllEntries = async (patientId: string) => {
  const { data } = await axios.get<Entry[]>(
    `${apiBaseUrl}/patients/${patientId}/entries`
  );
  return data;
};

const createEntry = async (object: NewEntry, patientId: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );

  return data;
};

export default {
  getAll,
  create,
  getAllSensitive,
  createEntry,
  getAllEntries,
};
