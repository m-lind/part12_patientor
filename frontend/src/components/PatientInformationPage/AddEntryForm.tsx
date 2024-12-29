import { useState, SyntheticEvent } from "react";
import { NewEntry, HealthCheckRating, Diagnosis } from "../../types";
import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

interface Props {
  onSubmit: (values: NewEntry) => void;
  entryType?: NewEntry["type"];
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onSubmit, entryType, diagnoses }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);

  let entry: NewEntry;

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
    };

    switch (entryType) {
      case "HealthCheck":
        entry = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: Number(healthCheckRating),
        };
        break;
      case "Hospital":
        entry = {
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        entry = {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                }
              : undefined,
        };
        break;
      default:
        break;
    }

    onSubmit(entry);
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setDiagnosisCodes([]);
  };

  const cancelEntry = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setDiagnosisCodes([]);
  };

  return (
    <div>
      {entryType && (
        <div>
          <h3>New entry</h3>
          <form onSubmit={addEntry}>
            <InputLabel>Description</InputLabel>
            <TextField
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <InputLabel>Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <InputLabel>Specialist</InputLabel>
            <TextField
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            {entryType === "HealthCheck" && (
              <div>
                <InputLabel>Health check rating</InputLabel>
                <Select
                  fullWidth
                  value={healthCheckRating}
                  onChange={({ target }) => setHealthCheckRating(target.value)}
                  label="Health check rating"
                >
                  <MenuItem value={HealthCheckRating.Healthy}>
                    {HealthCheckRating.Healthy}
                  </MenuItem>
                  <MenuItem value={HealthCheckRating.LowRisk}>
                    {HealthCheckRating.LowRisk}
                  </MenuItem>
                  <MenuItem value={HealthCheckRating.HighRisk}>
                    {HealthCheckRating.HighRisk}
                  </MenuItem>
                  <MenuItem value={HealthCheckRating.CriticalRisk}>
                    {HealthCheckRating.CriticalRisk}
                  </MenuItem>
                </Select>
              </div>
            )}
            {entryType === "Hospital" && (
              <div>
                <InputLabel>Discharge date</InputLabel>
                <TextField
                  type="date"
                  fullWidth
                  value={dischargeDate}
                  onChange={({ target }) => setDischargeDate(target.value)}
                />
                <InputLabel>Discharge criteria</InputLabel>
                <TextField
                  fullWidth
                  value={dischargeCriteria}
                  onChange={({ target }) => setDischargeCriteria(target.value)}
                />
              </div>
            )}
            {entryType === "OccupationalHealthcare" && (
              <div>
                <InputLabel>Employer name</InputLabel>
                <TextField
                  fullWidth
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                />
                <InputLabel>Sick leave start date</InputLabel>
                <TextField
                  type="date"
                  fullWidth
                  value={sickLeaveStart}
                  onChange={({ target }) => setSickLeaveStart(target.value)}
                />
                <InputLabel>Sick leave end date</InputLabel>
                <TextField
                  type="date"
                  fullWidth
                  value={sickLeaveEnd}
                  onChange={({ target }) => setSickLeaveEnd(target.value)}
                />
              </div>
            )}
            <div>
              <InputLabel>Diagnosis codes</InputLabel>
              <Select
                label="Diagnosis codes"
                fullWidth
                multiple
                value={diagnosisCodes}
                onChange={({ target }) =>
                  setDiagnosisCodes(target.value as Diagnosis["code"][])
                }
              >
                {diagnoses.map(diagnose => (
                  <MenuItem key={diagnose.code} value={diagnose.code}>
                    {diagnose.code}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={() => cancelEntry()}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddEntryForm;
