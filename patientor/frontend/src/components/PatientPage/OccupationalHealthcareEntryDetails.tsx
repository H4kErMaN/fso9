import { Typography } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import type { OccupationalHealthcareEntry } from '../../types.ts'

interface Props {
  entry: OccupationalHealthcareEntry
}

const OccupationalHealthcareEntryDetails = ({ entry }: Props) => {
  return (
    <>
      <Typography variant="body1">
        <strong>{entry.date}</strong> <WorkIcon />{' '}
        <em>{entry.employerName}</em>
      </Typography>
      <Typography variant="body2">
        <em>{entry.description}</em>
      </Typography>
      {entry.sickLeave && (
        <Typography variant="body2">
          sick leave: {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
        diagnose by {entry.specialist}
      </Typography>
    </>
  )
}

export default OccupationalHealthcareEntryDetails
