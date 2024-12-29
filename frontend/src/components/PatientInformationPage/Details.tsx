import React from "react";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "./../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import Heart from "./HealthCheckRatingColor";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <div>
      <div>
        {entry.date} <LocalHospitalIcon />
        <div>
          <i>{entry.description}</i>
        </div>
        <div>Patient discharge criteria: {entry.discharge.criteria}</div>
        <div>Patient discharged on {entry.discharge.date}</div>
      </div>
      diagnose by {entry.specialist}
    </div>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div>
      <div>
        {entry.date} <MedicalInformationIcon /> {entry.employerName}
        <div>
          <i>{entry.description}</i>
        </div>
        <div>
          {entry.sickLeave && (
            <div>
              Sick leave starts {entry.sickLeave?.startDate} and ends{" "}
              {entry.sickLeave?.endDate}
            </div>
          )}
        </div>
      </div>
      diagnose by {entry.specialist}
    </div>
  );
};

const HealthCareEntryDetails: React.FC<{
  entry: HealthCheckEntry;
}> = ({ entry }) => {
  return (
    <div>
      <div>
        {entry.date} <MonitorHeartIcon />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>
        <Heart rating={entry.healthCheckRating} />
      </div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default EntryDetails;
