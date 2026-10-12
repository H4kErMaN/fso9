import { Typography } from '@mui/material'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { HealthCheckRating } from '../../types.ts'
import type { HealthCheckEntry } from '../../types.ts'

interface Props {
  entry: HealthCheckEntry
}

const ratingColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return 'green'
    case HealthCheckRating.LowRisk:
      return 'yellow'
    case HealthCheckRating.HighRisk:
      return 'orange'
    case HealthCheckRating.CriticalRisk:
      return 'red'
    default:
      return 'gray'
  }
}

const HealthCheckEntryDetails = ({ entry }: Props) => {
  return (
    <>
      <Typography variant="body1">
        <strong>{entry.date}</strong> <MedicalServicesIcon />
      </Typography>
      <Typography variant="body2">
        <em>{entry.description}</em>
      </Typography>
      <Typography variant="body2">
        <FavoriteIcon sx={{ color: ratingColor(entry.healthCheckRating) }} />
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
        diagnose by {entry.specialist}
      </Typography>
    </>
  )
}

export default HealthCheckEntryDetails
