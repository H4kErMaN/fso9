import { isNotNumber } from './utils.ts'

interface BmiValues {
  height: number
  weight: number
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('Provided values were not numbers!')
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  }
}

export const calculateBmi = (
  heightCm: number,
  weightKg: number
): string => {
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('height and weight must be positive numbers')
  }

  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)

  if (bmi < 16.0) return 'Underweight (Severe thinness)'
  if (bmi < 17.0) return 'Underweight (Moderate thinness)'
  if (bmi < 18.5) return 'Underweight (Mild thinness)'
  if (bmi < 25.0) return 'Normal range'
  if (bmi < 30.0) return 'Overweight (Pre-obese)'
  if (bmi < 35.0) return 'Obese (Class I)'
  if (bmi < 40.0) return 'Obese (Class II)'
  return 'Obese (Class III)'
}

// Only run the CLI parsing block when the file is executed directly
// (e.g. `npm run calculateBmi 180 74`). When index.ts imports from
// this module, this block is skipped.
if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseBmiArguments(process.argv)
    console.log(calculateBmi(height, weight))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
  }
}
