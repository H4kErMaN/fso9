import express from 'express'
import { z } from 'zod'
import patientService from '../services/patientService.ts'
import { toNewPatient, toNewEntry } from '../utils.ts'

const router = express.Router()

router.get('/', (_req, res): void => {
  res.send(patientService.getNonSensitivePatients())
})

router.get('/:id', (req, res): void => {
  const patient = patientService.getById(req.params.id)
  if (!patient) {
    res.status(404).send({ error: 'Patient not found' })
    return
  }
  res.send(patient)
})

router.post('/', (req, res): void => {
  try {
    const newPatient = toNewPatient(req.body)
    const addedPatient = patientService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues })
      return
    }

    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

router.post('/:id/entries', (req, res): void => {
  try {
    const newEntry = toNewEntry(req.body)
    const added = patientService.addEntry(req.params.id, newEntry)
    if (!added) {
      res.status(404).send({ error: 'Patient not found' })
      return
    }
    res.json(added)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues })
      return
    }

    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
