import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, Typography } from '@mui/material'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'

import patientService from '../../services/patients.ts'
import type { Diagnosis, Entry, EntryWithoutId, Patient } from '../../types.ts'
import { Gender } from '../../types.ts'
import EntryDetails from './EntryDetails.tsx'
import AddEntryForm from './AddEntryForm.tsx'

interface PatientPageProps {
  diagnoses: Diagnosis[]
}

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />
    case Gender.Female:
      return <FemaleIcon />
    case Gender.Other:
      return <TransgenderIcon />
    default:
      return null
  }
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchPatient = async () => {
      try {
        const data = await patientService.getById(id)
        setPatient(data)
      } catch (err) {
        console.error(err)
        setError('Could not load patient')
      }
    }

    void fetchPatient()
  }, [id])

  const handleAddEntry = async (newEntry: EntryWithoutId): Promise<void> => {
    if (!id || !patient) return

    try {
      const added: Entry = await patientService.createEntry(id, newEntry)
      setPatient({ ...patient, entries: patient.entries.concat(added) })
      setFormError(null)
      setFormOpen(false)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const data: unknown = e.response?.data
        if (typeof data === 'string') {
          setFormError(data)
        } else if (data && typeof data === 'object') {
          setFormError(JSON.stringify(data))
        } else {
          setFormError(e.message)
        }
      } else if (e instanceof Error) {
        setFormError(e.message)
      } else {
        setFormError('Unknown error')
      }
    }
  }

  if (error) return <Typography color="error">{error}</Typography>
  if (!patient) return <Typography>loading...</Typography>

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" component="h2">
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>

      {patient.ssn && (
        <Typography variant="body1">ssn: {patient.ssn}</Typography>
      )}

      <Typography variant="body1">
        occupation: {patient.occupation}
      </Typography>

      {patient.dateOfBirth && (
        <Typography variant="body1">
          date of birth: {patient.dateOfBirth}
        </Typography>
      )}

      {formOpen ? (
        <AddEntryForm
          onSubmit={handleAddEntry}
          error={formError}
          diagnoses={diagnoses}
          onCancel={() => setFormOpen(false)}
        />
      ) : (
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setFormOpen(true)}
        >
          Add New Entry
        </Button>
      )}

      <Typography variant="h5" component="h3" sx={{ mt: 3 }}>
        entries
      </Typography>

      {patient.entries.length === 0 ? (
        <Typography variant="body1">No entries yet.</Typography>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          />
        ))
      )}
    </Box>
  )
}

export default PatientPage
