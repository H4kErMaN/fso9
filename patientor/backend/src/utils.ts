import { NewPatientSchema, NewEntrySchema } from './types.ts'
import type { NewPatient, EntryWithoutId } from './types.ts'

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object)
}

export const toNewEntry = (object: unknown): EntryWithoutId => {
  return NewEntrySchema.parse(object)
}
