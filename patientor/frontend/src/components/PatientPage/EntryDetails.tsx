import { Box } from '@mui/material'
import type { Diagnosis, Entry } from '../../types.ts'
import { assertNever } from '../../utils.ts'
import HospitalEntryDetails from './HospitalEntryDetails.tsx'
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails.tsx'
import HealthCheckEntryDetails from './HealthCheckEntryDetails.tsx'

interface EntryDetailsProps {
  entry: Entry
  diagnoses: Diagnosis[]
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  const findName = (code: string): string | undefined => {
    return diagnoses.find((d) => d.code === code)?.name
  }

  // Switch on the discriminator (`entry.type`). Each case narrows the
  // entry to a specific interface, so the type-specific component can
  // safely access its unique fields (discharge, employerName, rating).
  const renderBody = () => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntryDetails entry={entry} />
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryDetails entry={entry} />
      case 'HealthCheck':
        return <HealthCheckEntryDetails entry={entry} />
      default:
        return assertNever(entry)
    }
  }

  return (
    <Box
      sx={{
        border: '1px solid #999',
        borderRadius: 2,
        p: 2,
        mb: 1,
      }}
    >
      {renderBody()}

      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {findName(code)}
            </li>
          ))}
        </ul>
      )}
    </Box>
  )
}

export default EntryDetails
