import data from "./../../data/diagnosesData";
import { Diagnosis } from "./../types";

const diagnoses: Diagnosis[] = data;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
