// Weather and Visibility as const object + derived type —
// matches the backend's Zod schema values.
export const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const

export type Weather = (typeof Weather)[keyof typeof Weather]

export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const

export type Visibility = (typeof Visibility)[keyof typeof Visibility]

export interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment?: string
}

// NonSensitiveDiaryEntry = what the GET /api/diaries endpoint returns
// (no `comment` field by default).
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>
