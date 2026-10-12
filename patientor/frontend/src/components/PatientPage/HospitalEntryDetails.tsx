import { Typography } from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import type { HospitalEntry } from '../../types.ts'

interface Props {
  entry: HospitalEntry
}

const HospitalEntryDetails = ({ entry }: Props) => {
  return (
    <>
      <Typography variant="body1">
        <strong>{entry.date}</strong> <LocalHospitalIcon />
      </Typography>
      <Typography variant="body2">
        <em>{entry.description}</em>
      </Typography>
      <Typography variant="body2">
        discharged {entry.discharge.date}: {entry.discharge.criteria}
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
        diagnose by {entry.specialist}
      </Typography>
    </>
  )
}

export default HospitalEntryDetails
