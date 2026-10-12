import axios from 'axios'
import type {
  Entry,
  EntryWithoutId,
  Patient,
  PatientFormValues,
} from '../types.ts'

import { apiBaseUrl } from '../constants.ts'

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`)
  return data
}

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
  return data
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  )
  return data
}

const createEntry = async (patientId: string, entry: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  )
  return data
}

export default {
  getAll,
  getById,
  create,
  createEntry,
}
