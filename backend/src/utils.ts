import {
  NewPatient,
  Gender,
  NewEntry,
  HealthCheckRating,
  Diagnosis,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseEntry = (entry: unknown): string => {
  if (!isString(entry)) {
    throw new Error("Incorrect or missing entry");
  }
  return entry;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map(g => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender" + gender);
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatient = {
      name: parseEntry(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseEntry(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseEntry(object.occupation),
      entries: [],
    };
    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> => {
  if (!diagnosisCodes || typeof diagnosisCodes !== "object") {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return diagnosisCodes as Array<Diagnosis["code"]>;
};

interface DischargeData {
  date: string;
  criteria: string;
}

const parseDischarge = (discharge: unknown): DischargeData => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("date" in discharge && "criteria" in discharge) {
    return {
      date: parseDate(discharge.date),
      criteria: parseEntry(discharge.criteria),
    };
  }
  throw new Error("Incorrect discharge data");
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    typeof healthCheckRating === "number" &&
    HealthCheckRating[healthCheckRating] !== undefined
  ) {
    return healthCheckRating;
  }
  throw new Error("Incorrect health check rating!");
};

interface SickLeave {
  startDate: string;
  endDate: string;
}

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    return {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate),
    };
  }
  throw new Error("Incorrect sick leave data");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object &&
    "discharge" in object
  ) {
    const newEntry: NewEntry = {
      description: parseEntry(object.description),
      date: parseDate(object.date),
      specialist: parseEntry(object.specialist),
      type: "Hospital",
      discharge: parseDischarge(object.discharge),
    };

    if ("diagnosisCodes" in object) {
      newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }
    return newEntry;
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object &&
    "employerName" in object
  ) {
    const newEntry: NewEntry = {
      description: parseEntry(object.description),
      date: parseDate(object.date),
      specialist: parseEntry(object.specialist),
      type: "OccupationalHealthcare",
      employerName: parseEntry(object.employerName),
    };

    if ("sickLeave" in object) {
      newEntry.sickLeave = parseSickLeave(object.sickLeave);
    }
    if ("diagnosisCodes" in object) {
      newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }

    return newEntry;
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object &&
    "healthCheckRating" in object
  ) {
    const newEntry: NewEntry = {
      description: parseEntry(object.description),
      date: parseDate(object.date),
      specialist: parseEntry(object.specialist),
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
    if ("diagnosisCodes" in object) {
      newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }
    return newEntry;
  }

  throw new Error("Incorrect data");
};

export default toNewPatient;
