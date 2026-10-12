import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'

import type { Diagnosis, EntryWithoutId } from '../../types.ts'
import { HealthCheckRating } from '../../types.ts'
import { assertNever } from '../../utils.ts'

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'

interface AddEntryFormProps {
  onSubmit: (entry: EntryWithoutId) => Promise<void>
  error: string | null
  diagnoses: Diagnosis[]
  onCancel: () => void
}

const AddEntryForm = ({
  onSubmit,
  error,
  diagnoses,
  onCancel,
}: AddEntryFormProps) => {
  const [type, setType] = useState<EntryType>('HealthCheck')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  )

  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')

  const [employerName, setEmployerName] = useState('')
  const [sickLeaveStart, setSickLeaveStart] = useState('')
  const [sickLeaveEnd, setSickLeaveEnd] = useState('')

  const resetFields = (): void => {
    setDescription('')
    setDate('')
    setSpecialist('')
    setDiagnosisCodes([])
    setHealthCheckRating(HealthCheckRating.Healthy)
    setDischargeDate('')
    setDischargeCriteria('')
    setEmployerName('')
    setSickLeaveStart('')
    setSickLeaveEnd('')
  }

  const buildEntry = (): EntryWithoutId => {
    const diagnosisField =
      diagnosisCodes.length > 0 ? { diagnosisCodes } : {}

    const base = {
      description,
      date,
      specialist,
      ...diagnosisField,
    }

    switch (type) {
      case 'HealthCheck':
        return {
          ...base,
          type: 'HealthCheck',
          healthCheckRating,
        }
      case 'Hospital':
        return {
          ...base,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        }
      case 'OccupationalHealthcare': {
        const sickLeaveField =
          sickLeaveStart && sickLeaveEnd
            ? {
                sickLeave: {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                },
              }
            : {}
        return {
          ...base,
          type: 'OccupationalHealthcare',
          employerName,
          ...sickLeaveField,
        }
      }
      default:
        return assertNever(type)
    }
  }

  const addEntry = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault()
    const entry = buildEntry()
    await onSubmit(entry)
    if (!error) resetFields()
  }

  const handleTypeChange = (event: SelectChangeEvent): void => {
    setType(event.target.value as EntryType)
  }

  const handleRatingChange = (
    event: SelectChangeEvent<number>
  ): void => {
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating)
  }

  const handleDiagnosisCodesChange = (
    event: SelectChangeEvent<string[]>
  ): void => {
    const value = event.target.value
    // MUI's multiple select returns string[] here but typing can collapse
    // to string when autofilled from the DOM — normalise just in case.
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Box
      sx={{
        border: '2px dashed #999',
        borderRadius: 2,
        p: 2,
        my: 2,
      }}
    >
      <Typography variant="h6" component="h3">
        New entry
      </Typography>

      {error && (
        <Typography color="error" variant="body2" sx={{ my: 1 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={addEntry}>
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel>Entry type</InputLabel>
          <Select
            value={type}
            label="Entry type"
            onChange={handleTypeChange}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ my: 1 }}
        />

        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ my: 1 }}
        />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          sx={{ my: 1 }}
        />

        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            input={<OutlinedInput label="Diagnosis codes" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                <Checkbox checked={diagnosisCodes.includes(d.code)} />
                <ListItemText primary={`${d.code} ${d.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === 'HealthCheck' && (
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel>Healthcheck rating</InputLabel>
            <Select
              value={healthCheckRating}
              label="Healthcheck rating"
              onChange={handleRatingChange}
            >
              <MenuItem value={HealthCheckRating.Healthy}>
                Healthy (0)
              </MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>
                Low risk (1)
              </MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>
                High risk (2)
              </MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>
                Critical risk (3)
              </MenuItem>
            </Select>
          </FormControl>
        )}

        {type === 'Hospital' && (
          <>
            <TextField
              label="Discharge date"
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ my: 1 }}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
              sx={{ my: 1 }}
            />
          </>
        )}

        {type === 'OccupationalHealthcare' && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              sx={{ my: 1 }}
            />
            <TextField
              label="Sick leave start"
              type="date"
              fullWidth
              value={sickLeaveStart}
              onChange={(e) => setSickLeaveStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ my: 1 }}
            />
            <TextField
              label="Sick leave end"
              type="date"
              fullWidth
              value={sickLeaveEnd}
              onChange={(e) => setSickLeaveEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ my: 1 }}
            />
          </>
        )}

        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button variant="contained" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default AddEntryForm
