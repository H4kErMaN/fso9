import express from 'express'
import { calculateBmi } from './bmiCalculator.ts'
import { calculateExercises } from './exerciseCalculator.ts'
import { isNotNumber } from './utils.ts'

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) &&
  (value as unknown[]).every((item) => typeof item === 'number')

const app = express()

// Parse JSON request bodies so req.body is populated for POST requests.
app.use(express.json())

app.get('/hello', (_req, res): void => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res): void => {
  const { height, weight } = req.query

  if (
    !height ||
    !weight ||
    isNotNumber(height) ||
    isNotNumber(weight)
  ) {
    res.status(400).json({ error: 'malformatted parameters' })
    return
  }

  const heightNum = Number(height)
  const weightNum = Number(weight)

  try {
    const bmi = calculateBmi(heightNum, weightNum)
    res.json({
      weight: weightNum,
      height: heightNum,
      bmi,
    })
  } catch {
    res.status(400).json({ error: 'malformatted parameters' })
  }
})

app.post('/exercises', (req, res): void => {
  const { daily_exercises, target } = req.body as {
    daily_exercises?: unknown
    target?: unknown
  }

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' })
    return
  }

  if (!isNumberArray(daily_exercises) || isNotNumber(target)) {
    res.status(400).json({ error: 'malformatted parameters' })
    return
  }

  try {
    const result = calculateExercises(daily_exercises, Number(target))
    res.json(result)
  } catch {
    res.status(400).json({ error: 'malformatted parameters' })
  }
})

const PORT = 3000

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`)
})
