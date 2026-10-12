import { v1 as uuid } from 'uuid'
import patients from '../../data/patients.ts'
import type {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types.ts'

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const getById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id)
}

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: [],
  }

  patients.push(newPatient)
  return newPatient
}

const addEntry = (
  patientId: string,
  newEntry: EntryWithoutId
): Entry | undefined => {
  const patient = patients.find((p) => p.id === patientId)
  if (!patient) return undefined

  // Spread onto an object with id; the result conforms to the full
  // Entry union because EntryWithoutId covers every variant.
  const entry: Entry = { id: uuid(), ...newEntry }
  patient.entries.push(entry)
  return entry
}

export default {
  getNonSensitivePatients,
  getById,
  addPatient,
  addEntry,
}
