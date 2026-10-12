import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from 'react-router-dom'
import { Button, Divider, Container, Typography } from '@mui/material'

import { apiBaseUrl } from './constants.ts'
import type { Diagnosis, Patient } from './types.ts'

import patientService from './services/patients.ts'
import diagnosisService from './services/diagnoses.ts'
import PatientListPage from './components/PatientListPage'
import PatientPage from './components/PatientPage'

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      const patientList = await patientService.getAll()
      setPatients(patientList)
    }
    void fetchPatientList()

    const fetchDiagnoses = async () => {
      const diagnosisList = await diagnosisService.getAll()
      setDiagnoses(diagnosisList)
    }
    void fetchDiagnoses()
  }, [])

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={<PatientPage diagnoses={diagnoses} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  )
}

export default App
