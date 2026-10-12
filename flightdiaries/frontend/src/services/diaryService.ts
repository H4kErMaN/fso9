import axios from 'axios'
import type { DiaryEntry, NonSensitiveDiaryEntry } from '../types.ts'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async (): Promise<NonSensitiveDiaryEntry[]> => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
  return response.data
}

// Backend returns the full DiaryEntry including id — we assume the
// server generates it on save.
export const createDiary = async (
  entry: Omit<DiaryEntry, 'id'>
): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(baseUrl, entry)
  return response.data
}
