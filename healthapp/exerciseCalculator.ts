import { isNotNumber } from './utils.ts'

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: 1 | 2 | 3
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseValues {
  target: number
  hours: number[]
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const numericArgs = args.slice(2)

  if (numericArgs.some(isNotNumber)) {
    throw new Error('Provided values were not numbers!')
  }

  const [target, ...hours] = numericArgs.map(Number)

  return { target, hours }
}

export const calculateExercises = (
  hours: number[],
  target: number
): ExerciseResult => {
  const periodLength = hours.length
  const trainingDays = hours.filter((h) => h > 0).length
  const average =
    hours.reduce((sum, h) => sum + h, 0) / periodLength
  const success = average >= target

  let rating: 1 | 2 | 3
  let ratingDescription: string

  if (average >= target) {
    rating = 3
    ratingDescription = 'great job, target reached'
  } else if (average >= target * 0.75) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'bad'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, hours } = parseExerciseArguments(process.argv)
    console.log(calculateExercises(hours, target))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
  }
}
